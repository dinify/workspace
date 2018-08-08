import React from "react";
import jsQR from 'jsqr';

export default class QRscanner extends React.Component {
  constructor(props) {
    super(props);
    this.setContext = this.setContext.bind(this);
    this.setVideoContext = this.setVideoContext.bind(this);
    this.tick = this.tick.bind(this);
    this.drawLine = this.drawLine.bind(this);
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
      this.video.srcObject = stream;
      this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.play();
      requestAnimationFrame(this.tick);
    });
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
      requestAnimationFrame(this.tick);
    }
  }



  render() {
    return (
      <div id="container">
        <video ref={this.setVideoContext} id="qrVideo" hidden />
        <canvas
          id="qrCanvas"
          style={{width: '100%'}}
          ref={this.setContext}
        />
      </div>
    );
  }
}
