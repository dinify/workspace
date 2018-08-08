import React from "react";
import jsQR from 'jsqr';
import QrScanner from "lib/qr-scanner.min.js";

export default class QRscanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraAccessible: 'INIT',
      status: null
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

  setContext(r) {
    this.canvasElement = r;
    if (r) this.ctx = r.getContext("2d");
  }

  setVideoContext(v) {
    this.video = v;
  }

  drawLine(begin, end, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(begin.x, begin.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  tick() {
    if (this.ctx && this.video) {
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.canvasElement.height = this.video.videoHeight;
        this.canvasElement.width = this.video.videoWidth;

        this.ctx.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
        const imageData = this.ctx.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          this.props.onData(code.data);
        }
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
    return (
      <div id="container">
        <video ref={this.setVideoContext} id="qrVideo" hidden />
        {this.state.cameraAccessible === 'INIT' ? 'Opening camera...' : ''}
        <canvas
          hidden={this.state.cameraAccessible !== 'DONE'}
          id="qrCanvas"
          style={{width: '100%'}}
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
