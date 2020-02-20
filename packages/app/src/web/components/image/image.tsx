import React from 'react';
import toPairs from 'ramda/es/toPairs';
import { supportsWebpSync } from '@dinify/common/src/lib/FN';

export interface ImageProps {
  url: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  options?: Partial<ImageURIOptions> | false;
}

/**
 * Unofficial collection of possibly working parameters for Image URLs
 * 
 * Source: https://stackoverflow.com/questions/25148567/list-of-all-the-app-engine-images-service-get-serving-url-uri-options
 * 
*/
/**
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
export type ImageURIOptions = {
  original: boolean, // leave original size
  size: number,      // largest dimension
  width: number,
  height: number,
  crop: boolean,
  centerCrop: boolean,
  imageCrop: boolean,
  circleCrop: boolean,
  expiration: number,     // set cache-control max-age header (in days)
  requestWebp: boolean,
  noWebp: boolean,
}

export const ImageURIParams: { [key: string]: string } = {
  width: 'w',
  height: 'h',
  size: 's',
  crop: 'c',
  imageCrop: 'ci',
  centerCrop: 'n',
  circleCrop: 'cc',
  expiration: 'e',
  requestWebp: 'rw',
  noWebp: 'nw'
}

const getUrl = (url: string, options?: Partial<ImageURIOptions>) => {
  if (options) {
    const params = toPairs(options).map(([k, v]) => {
      let key = ImageURIParams[k];
      if (k === 'original') return 's0';
      if (typeof v === 'boolean') {
        if (v === true) return key;
        return null;
      }
      return `${key}${v}`;
    }).filter(v => v !== null);
    return `${url}=${params.join('-')}`;
  }
  return url;
};

const ImageComponent: React.FC<ImageProps> = ({
  url,
  options,
  className,
  style,
}) => {
  const dppx = window.devicePixelRatio;
  if (options && options.width) options.width *= dppx;
  if (options && options.height) options.height *= dppx;

  const supportsWebp = supportsWebpSync();
  const src = options === false ? url : getUrl(url, {
    requestWebp: supportsWebp,
    noWebp: !supportsWebp,
    ...options
  });
  // useEffect(() => {
  //   if (self.current) {
  //     const dppx = window.devicePixelRatio;
  //     const width = self.current.clientWidth * dppx;
  //     const height = self.current.clientHeight * dppx;
  //     setDimensions({ dppx, width, height });
  //   }
  // }, []);
  const imgStyle = {
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return <div
    className={className}
    style={{ ...style, ...imgStyle }}
  // ref={self}
  />;
}

export default ImageComponent;