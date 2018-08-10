import React from "react";
import jsQR from 'jsqr';
import QrScanner from "lib/qr-scanner.min.js";

export default class QRscanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraAccessible: 'INIT',
      box: {
        visible: false,
        location: {
          topLeftCorner: {x: 0, y: 0},
          topRightCorner: {x: 0, y: 0},
          bottomLeftCorner: {x: 0, y: 0},
          bottomRightCorner: {x: 0, y: 0},
        },
      },
      status: null,
    };
    this.setContext = this.setContext.bind(this);
    this.setVideoContext = this.setVideoContext.bind(this);
    this.tick = this.tick.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const displayVideo = (stream) => {
      this.setState({ cameraAccessible: 'DONE' });
      this.video.srcObject = stream;
      this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.setAttribute("autoplay", true); // required to tell iOS safari we don't want fullscreen
      this.video.play();
      requestAnimationFrame(this.tick);
    }
    navigator.getWebcam = (
      navigator.getUserMedia ||
      navigator.webKitGetUserMedia ||
      navigator.moxGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } })
      .then(displayVideo)
      .catch((e) => {
        this.setState({ cameraAccessible: 'FAIL' });
        console.log(e.name + ": " + e.message);
      });
    } else {
      if (!navigator.getWebcam) this.setState({ cameraAccessible: 'FAIL' });
      else {
        navigator.getWebcam({ audio: true, video: { facingMode: 'environment' } }, displayVideo,
          () => {
            this.setState({ cameraAccessible: 'FAIL' });
            console.log("Web cam is not accessible.");
          }
        );
      }
    }
  }

  componentWillUnmount() {
    this.video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
  }

  setOverlayContext = (r) => {
    this.canvasOverlayElement = r;
    if (r) this.ctx2 = r.getContext("2d");
  }

  setContext(r) {
    this.canvasElement = r;
    if (r) this.ctx = r.getContext("2d");
  }

  setVideoContext(v) {
    this.video = v;
  }

  onLocation = (visible, location) => {
    if (!this.state.box.visible && !visible) return;
    const box = this.state.box;
    if (location) box.location = location;
    box.visible = visible;
    this.setState({box});
  }

  drawLine(begin, end, color) {
    this.ctx2.beginPath();
    this.ctx2.moveTo(begin.x, begin.y);
    this.ctx2.lineTo(end.x, end.y);
    this.ctx2.lineWidth = 4;
    this.ctx2.strokeStyle = color;
    this.ctx2.stroke();
  }

  tick() {
    if (this.ctx && this.video) {
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.canvasElement.height = this.video.videoHeight;
        this.canvasElement.width = this.video.videoWidth;
        this.canvasOverlayElement.height = this.video.videoHeight;
        this.canvasOverlayElement.width = this.video.videoWidth;

        this.ctx.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
        const imageData = this.ctx.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          this.onLocation(true, code.location);
          this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          this.props.onData(code.data);
        }
        else this.onLocation(false, null);
      }
      setTimeout(() => requestAnimationFrame(this.tick), 100);
    }
  }

  handleInputChange(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    QrScanner.scanImage(file)
      .then(result => {
        this.props.onCode(result);
      })
      .catch(e => {
        this.setState({ status: e });
        console.log(e || 'No QR code found.')
    });
  }

  render() {
    const b = this.state.box;
    return (
      <div id="container" style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <video
          id="qrVideo"
          ref={this.setVideoContext}
          hidden={this.state.cameraAccessible !== 'DONE'}
          style={{
            minHeight: '100vh'
          }}/>
        {this.state.cameraAccessible === 'INIT' ? 'Opening camera...' : ''}
        <canvas
          hidden={this.state.cameraAccessible !== 'DONE'}
          id="qrCanvasOverlay"
          style={{
            position: 'absolute',
            minHeight: '100vh'
          }}
          ref={this.setOverlayContext}
        />

        <canvas
          hidden
          id="qrCanvas"
          style={{
            position: 'absolute',
            minHeight: '100vh'
          }}
          ref={this.setContext}
        />
        {this.state.cameraAccessible === 'FAIL' ?
          <div>
            Scanning QR from browser is not available on this device
            <input
              type="file"
              accept="image/*"
              onChange={this.handleInputChange}
            />
          </div>
        : ''}
        {this.state.status}
      </div>
    );
  }
}
