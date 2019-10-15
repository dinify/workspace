import React from "react";
import { useTranslation } from "@dinify/common/src/lib/i18n";
import PhotoCamera from '@material-ui/icons/PhotoCameraRounded';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ZbarScanner from 'lib/zbar';
// import QrScanner from "lib/qr-scanner.min.js";

class QRscanner extends React.Component {
  constructor(props) {
    super(props);
    this.running = true;
    this.scanner = null;
    this.state = {
      cameraAccessible: 'INIT',
      status: null,
    };
  }

  componentDidMount() {
    const onAnimationFrame = (imageData, width, height) => {
      if (this.scanner) {
        const codes = this.scanner.scanQrcode(imageData.data, width, height);
        if (codes.length > 0) {
          this.props.onData(codes);
        }
      }
    };
    const displayVideo = (stream) => {
      this.setState({ cameraAccessible: 'DONE' });
      this.video.srcObject = stream;
      this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.setAttribute("autoplay", true);
      this.video.play();

      ZbarScanner({locateFile: (file) => `/libraries/zbar/${file}`}).then((instance) => {
        this.scanner = instance;
      });

      const canvas = document.createElement('canvas');

      const rasterize = () => {
        if (this.video && this.video.srcObject) {
          const videoElement = this.video;
          const sourceRectWidth = videoElement.videoWidth;
          const sourceRectHeight = videoElement.videoHeight;
          if (canvas.width !== sourceRectWidth || canvas.height !== sourceRectHeight) {
              canvas.width = sourceRectWidth;
              canvas.height = sourceRectHeight;
          }
          const context = canvas.getContext("2d", { alpha: false });
          if (context && sourceRectWidth > 0 && sourceRectHeight > 0) {
            context.imageSmoothingEnabled = false;
            context.drawImage(videoElement, 0, 0, sourceRectWidth, sourceRectHeight, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            onAnimationFrame(imageData, canvas.width, canvas.height);
          }
        }
        if (this.running) requestAnimationFrame(rasterize);
      }
      requestAnimationFrame(rasterize);
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
    }
    else if (!navigator.getWebcam) this.setState({ cameraAccessible: 'FAIL' });
    else {
      navigator.getWebcam({ audio: true, video: { facingMode: 'environment' } }, displayVideo,
        () => {
          this.setState({ cameraAccessible: 'FAIL' });
          console.log("Web cam is not accessible.");
        }
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cameraAccessible !== this.state.cameraAccessible
        && this.state.cameraAccessible === 'FAIL') {
      this.selectFromPhoto();
    }
  }

  componentWillUnmount() {
    this.running = false;
    if (this.video.srcObject) {
      this.video.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  setVideoContext = (v) => {
    this.video = v;
  }

  selectFromPhoto = () => {
		const camera = document.createElement('input');
		camera.setAttribute('type', 'file');
		camera.setAttribute('capture', 'camera');
		camera.id = 'camera';
    camera.onChange = (event) => {
      const file = event.target.files[0];
      if (!file) {
          return;
      }
      // TODO scan image from variable 'file'
      console.error('Scanning QR from file not implemented');
    }
    camera.click();
	}

  render() {
    // const b = this.state.box;
    const { t } = this.props;
    const { cameraAccessible, status } = this.state;
    return (
      <div id="container" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        color: 'rgba(255, 255, 255, 0.54)',
        height: '100%',
        width: '100vw'
      }}>
        <video
          muted autoPlay playsInline
          id="qrVideo"
          ref={this.setVideoContext}
          hidden={cameraAccessible !== 'DONE'}
          style={{
            maxHeight: '100%',
            maxWidth: '100vw'
          }}/>
        {cameraAccessible === 'INIT' ? <CircularProgress color="inherit"/> : ''}

        {cameraAccessible === 'FAIL' ?
          <div style={{margin: 32}}>
            <Typography style={{color: 'rgba(255, 255, 255, 0.87)'}} color="inherit" variant="subtitle1" gutterBottom>
              {t('camera.notAvailable.title')}
            </Typography>
            <Typography color="inherit" variant="caption" gutterBottom>
              {t('camera.notAvailable.subtitle')}
            </Typography>

            <Button variant="outlined" style={{border: '1px solid rgba(255, 255, 255, 0.38)'}} color="inherit" onClick={this.selectFromPhoto}>
              <PhotoCamera style={{marginRight: 8}} />
              {t('camera.takePhoto')}
            </Button>
          </div>
        : ''}
        {status}
      </div>
    );
  }
}

const Wrapper = (props) => {
  const { t } = useTranslation();
  return <QRscanner t={t} {...props} />
}; 

export default Wrapper;
