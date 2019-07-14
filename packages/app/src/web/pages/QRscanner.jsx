import React from "react";
import { withTranslation } from "react-i18next";
import PhotoCamera from '@material-ui/icons/PhotoCameraRounded';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import QrScanner from "lib/qr-scanner.min.js";

class QRscanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraAccessible: 'INIT',
      status: null,
    };
  }

  componentDidMount() {
    const displayVideo = (stream) => {
      this.setState({ cameraAccessible: 'DONE' });
      this.video.srcObject = stream;
      this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.setAttribute("autoplay", true);
      this.video.play();

      this.scanner = new QrScanner(this.video, result => {
        console.log('Decoded qr code:', result);
        this.props.onData(result);
      });
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
      QrScanner.scanImage(file)
        .then(result => {
          this.props.onCode(result);
        })
        .catch(e => {
          this.setState({ status: e });
          console.log(e || 'No QR code found.')
      });
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
        height: 'calc(100vh - 112px)',
        width: '100vw'
      }}>
        <video
          muted autoPlay playsInline
          id="qrVideo"
          ref={this.setVideoContext}
          hidden={cameraAccessible !== 'DONE'}
          style={{
            maxHeight: 'calc(100vh - 112px)',
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

export default withTranslation()(QRscanner);
