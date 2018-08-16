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
        time : 0,
        location: {
          topLeftCorner: {x: 0, y: 0},
          topRightCorner: {x: 0, y: 0},
          bottomLeftCorner: {x: 0, y: 0},
          bottomRightCorner: {x: 0, y: 0},
        },
      },
      status: null,
    };
    this.currentBox = {
      opacity: 0,
      topLeftCorner: {x: 0, y: 0},
      topRightCorner: {x: 0, y: 0},
      bottomLeftCorner: {x: 0, y: 0},
      bottomRightCorner: {x: 0, y: 0},
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
      console.log(stream);
      this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.setAttribute("autoplay", true);
      this.video.play();
      requestAnimationFrame(this.tick);
      requestAnimationFrame(this.tickOverlay);
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
    box.time = new Date().getTime();
    this.setState({box});
  }

  drawLine(begin, end) {
    this.ctx2.beginPath();
    this.ctx2.moveTo(begin.x, begin.y);
    this.ctx2.lineTo(end.x, end.y);
    this.ctx2.lineWidth = 4;
    this.ctx2.strokeStyle = '#FF3B58';
    this.ctx2.stroke();
  }

  tickOverlay = () => {
    ['topLeftCorner', 'topRightCorner', 'bottomLeftCorner', 'bottomRightCorner'].map(prop => {
      const to = this.state.box.location[prop];
      const curr = this.currentBox[prop];
      ['x', 'y'].map(coord => {
        this.currentBox[prop][coord] += (to[coord] - this.currentBox[prop][coord]) * 0.2;
      })
    });
    if (this.state.box.visible) this.currentBox.opacity += (1 - this.currentBox.opacity) * 0.5;
    else this.currentBox.opacity += -this.currentBox.opacity * 0.5;

    const roundedPoly = (ctx, points, radiusAll) => {
      let i, x, y, len, p1, p2, p3, v1, v2, sinA, sinA90, radDirection, drawDirection, angle, halfAngle, cRadius, lenOut,radius;
      // convert 2 points into vector form, polar form, and normalised
      const asVec = (p, pp, v) => {
        v.x = pp.x - p.x;
        v.y = pp.y - p.y;
        v.len = Math.sqrt(v.x * v.x + v.y * v.y);
        v.nx = v.x / v.len;
        v.ny = v.y / v.len;
        v.ang = Math.atan2(v.ny, v.nx);
      }
      radius = radiusAll;
      v1 = {};
      v2 = {};
      len = points.length;
      p1 = points[len - 1];
      // for each point
      for (i = 0; i < len; i++) {
        p2 = points[(i) % len];
        p3 = points[(i + 1) % len];
        //-----------------------------------------
        // Part 1
        asVec(p2, p1, v1);
        asVec(p2, p3, v2);
        sinA = v1.nx * v2.ny - v1.ny * v2.nx;
        sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
        angle = Math.asin(sinA);
        //-----------------------------------------
        radDirection = 1;
        drawDirection = false;
        if (sinA90 < 0) {
          if (angle < 0) {
            angle = Math.PI + angle;
          } else {
            angle = Math.PI - angle;
            radDirection = -1;
            drawDirection = true;
          }
        } else {
          if (angle > 0) {
            radDirection = -1;
            drawDirection = true;
          }
        }
        if(p2.radius !== undefined){
            radius = p2.radius;
        }else{
            radius = radiusAll;
        }
        //-----------------------------------------
        // Part 2
        halfAngle = angle / 2;
        //-----------------------------------------

        //-----------------------------------------
        // Part 3
        lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle));
        //-----------------------------------------

        //-----------------------------------------
        // Special part A
        if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
          lenOut = Math.min(v1.len / 2, v2.len / 2);
          cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
        } else {
          cRadius = radius;
        }
        //-----------------------------------------
        // Part 4
        x = p2.x + v2.nx * lenOut;
        y = p2.y + v2.ny * lenOut;
        //-----------------------------------------
        // Part 5
        x += -v2.ny * cRadius * radDirection;
        y += v2.nx * cRadius * radDirection;
        //-----------------------------------------
        // Part 6
        ctx.arc(x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection);
        //-----------------------------------------
        p1 = p2;
        p2 = p3;
      }
      ctx.closePath();
    }

    this.ctx2.clearRect(0, 0, this.canvasOverlayElement.width, this.canvasOverlayElement.height);
    this.ctx2.beginPath();
    roundedPoly(this.ctx2, [
      this.currentBox.topLeftCorner,
      this.currentBox.topRightCorner,
      this.currentBox.bottomRightCorner,
      this.currentBox.bottomLeftCorner
    ], 8);
    this.ctx2.rect(this.canvasOverlayElement.width, 0, -this.canvasOverlayElement.width, this.canvasOverlayElement.height);
    this.ctx2.fillStyle = `rgba(0, 0, 0, ${0.54 * this.currentBox.opacity})`;
    this.ctx2.fill();
    requestAnimationFrame(this.tickOverlay);
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
          this.props.onData(code.data);
        }
        else this.onLocation(false, null);
      }
      requestAnimationFrame(this.tick);
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        height: 'calc(100vh - 112px)',
        width: '100vw'
      }}>
        <video
          id="qrVideo"
          ref={this.setVideoContext}
          hidden={this.state.cameraAccessible !== 'DONE'}
          style={{
            maxHeight: 'calc(100vh - 112px)',
            maxWidth: '100vw'
          }}/>
        {this.state.cameraAccessible === 'INIT' ? 'Opening camera...' : ''}

        <canvas
          hidden={this.state.cameraAccessible !== 'DONE'}
          id="qrCanvasOverlay"
          style={{
            position: 'absolute',
            maxHeight: 'calc(100vh - 112px)',
            maxWidth: '100vw'
          }}
          ref={this.setOverlayContext}
        />

        <canvas
          hidden
          id="qrCanvas"
          style={{
            position: 'absolute',
            maxHeight: 'calc(100vh - 112px)',
            maxWidth: '100vw'
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
