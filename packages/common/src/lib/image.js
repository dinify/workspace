
const baseUrl = 'https://lh3.googleusercontent.com/';

export const generateUrl = (hash, params) => {
  return `${baseUrl}${hash}=${params.join('-')}`;
}

export const getHash = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

/*
See https://stackoverflow.com/questions/25148567/list-of-all-the-app-engine-images-service-get-serving-url-uri-options
Docs obtained from a javascript asset on one of google's pages

int:  s   ==> Size
int:  w   ==> Width
bool: c   ==> Crop
hex:  c   ==> BorderColor
bool: d   ==> Download
int:  h   ==> Height
bool: s   ==> Stretch
bool: h   ==> Html
bool: p   ==> SmartCrop
bool: pa  ==> PreserveAspectRatio
bool: pd  ==> Pad
bool: pp  ==> SmartCropNoClip
bool: pf  ==> SmartCropUseFace
int:  p   ==> FocalPlane
bool: n   ==> CenterCrop
int:  r   ==> Rotate
bool: r   ==> SkipRefererCheck
bool: fh  ==> HorizontalFlip
bool: fv  ==> VerticalFlip
bool: cc  ==> CircleCrop
bool: ci  ==> ImageCrop
bool: o   ==> Overlay
str:  o   ==> EncodedObjectId
str:  j   ==> EncodedFrameId
int:  x   ==> TileX
int:  y   ==> TileY
int:  z   ==> TileZoom
bool: g   ==> TileGeneration
bool: fg  ==> ForceTileGeneration
bool: ft  ==> ForceTransformation
int:  e   ==> ExpirationTime
str:  f   ==> ImageFilter
bool: k   ==> KillAnimation
int:  k   ==> FocusBlur
bool: u   ==> Unfiltered
bool: ut  ==> UnfilteredWithTransforms
bool: i   ==> IncludeMetadata
bool: ip  ==> IncludePublicMetadata
bool: a   ==> EsPortraitApprovedOnly
int:  a   ==> SelectFrameint
int:  m   ==> VideoFormat
int:  vb  ==> VideoBegin
int:  vl  ==> VideoLength
bool: lf  ==> LooseFaceCrop
bool: mv  ==> MatchVersion
bool: id  ==> ImageDigest
int:  ic  ==> InternalClient
bool: b   ==> BypassTakedown
int:  b   ==> BorderSize
str:  t   ==> Token
str:  nt0 ==> VersionedToken
bool: rw  ==> RequestWebp
bool: rwu ==> RequestWebpUnlessMaybeTransparent
bool: rwa ==> RequestAnimatedWebp
bool: nw  ==> NoWebp
bool: rh  ==> RequestH264
bool: nc  ==> NoCorrectExifOrientation
bool: nd  ==> NoDefaultImage
bool: no  ==> NoOverlay
str:  q   ==> QueryString
bool: ns  ==> NoSilhouette
int:  l   ==> QualityLevel
int:  v   ==> QualityBucket
bool: nu  ==> NoUpscale
bool: rj  ==> RequestJpeg
bool: rp  ==> RequestPng
bool: rg  ==> RequestGif
bool: pg  ==> TilePyramidAsProto
bool: mo  ==> Monogram
bool: al  ==> Autoloop
int:  iv  ==> ImageVersion
int:  pi  ==> PitchDegrees
int:  ya  ==> YawDegrees
int:  ro  ==> RollDegrees
int:  fo  ==> FovDegrees
bool: df  ==> DetectFaces
str:  mm  ==> VideoMultiFormat
bool: sg  ==> StripGoogleData
bool: gd  ==> PreserveGoogleData
bool: fm  ==> ForceMonogram
int:  ba  ==> Badge
int:  br  ==> BorderRadius
hex:  bc  ==> BackgroundColor
hex:  pc  ==> PadColor
hex:  sc  ==> SubstitutionColor
bool: dv  ==> DownloadVideo
bool: md  ==> MonogramDogfood
int:  cp  ==> ColorProfile
bool: sm  ==> StripMetadata
int:  cv  ==> FaceCropVersion

*/

export const argumentMap = {
  size: 's',
  width: 'w',
  crop: 'c',
  borderColor: 'c',
  download: 'd',
  height: 'h',
  stretch: 's',
  html: 'h',
  smartCrop: 'p',
  preserveAspectRatio: 'pa',
  pad: 'pd',
  smartCropNoClip: 'pp',
  smartCropUseFace: 'pf',
  focalPlane: 'p',
  centerCrop: 'n',
  rotate: 'r',
  skipRefererCheck: 'r',
  horizontalFlip: 'fh',
  verticalFlip: 'fv',
  circleCrop: 'cc',
  imageCrop: 'ci',
  overlay: 'o',
  encodedObjectId: 'o',
  encodedFrameId: 'j',
  tileX: 'x',
  tileY: 'y',
  tileZoom: 'z',
  tileGeneration: 'g',
  forceTileGeneration: 'fg',
  forceTransformation: 'ft',
  expirationTime: 'e',
  imageFilter: 'f',
  killAnimation: 'k',
  focusBlur: 'k',
  unfiltered: 'u',
  unfilteredWithTransforms: 'ut',
  includeMetadata: 'i',
  includePublicMetadata: 'ip',
  esPortraitApprovedOnly: 'a',
  selectFrameint: 'a',
  videoFormat: 'm',
  videoBegin: 'vb',
  videoLength: 'vl',
  looseFaceCrop: 'lf',
  matchVersion: 'mv',
  imageDigest: 'id',
  internalClient: 'ic',
  bypassTakedown: 'b',
  borderSize: 'b',
  token: 't',
  versionedToken: 'nt0',
  requestWebp: 'rw',
  requestWebpUnlessMaybeTransparent: 'rwu',
  requestAnimatedWebp: 'rwa',
  noWebp: 'nw',
  requestH264: 'rh',
  noCorrectExifOrientation: 'nc',
  noDefaultImage: 'nd',
  noOverlay: 'no',
  queryString: 'q',
  noSilhouette: 'ns',
  qualityLevel: 'l',
  qualityBucket: 'v',
  noUpscale: 'nu',
  requestJpeg: 'rj',
  requestPng: 'rp',
  requestGif: 'rg',
  tilePyramidAsProto: 'pg',
  monogram: 'mo',
  autoloop: 'al',
  imageVersion: 'iv',
  pitchDegrees: 'pi',
  yawDegrees: 'ya',
  rollDegrees: 'ro',
  fovDegrees: 'fo',
  detectFaces: 'df',
  videoMultiFormat: 'mm',
  stripGoogleData: 'sg',
  preserveGoogleData: 'gd',
  forceMonogram: 'fm',
  badge: 'ba',
  borderRadius: 'br',
  backgroundColor: 'bc',
  padColor: 'pc',
  substitutionColor: 'sc',
  downloadVideo: 'dv',
  monogramDogfood: 'md',
  colorProfile: 'cp',
  stripMetadata: 'sm',
  faceCropVersion: 'cv'
};

export const getArguments = (options) => {
  const args = [];
  Object.entries(options).map(([key, value]) => {
    let str = value.toString();
    if (value === true) str = '';
    args.push(argumentMap[key] + str);
  });
  return args;
}

export const getUrl = (url, options) => {
  return generateUrl(getHash(url), getArguments(options));
}
