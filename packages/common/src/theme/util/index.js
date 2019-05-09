import typographyData from '../../lib/typography.json';

export function pxToRem(px, unit = 'rem') {
  return `${px / 16}${unit}`;
}

export function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

export function getLineHeight(px) {
  //using baseline grid of 4dp
  return Math.ceil(px / 4) * 4;
}

export function getWeight(name) {
  let fontWeight;
  switch(name) {
    case 'Hairline':
    case 'Thin':
      fontWeight = 100;
      break;
    case 'ExtraLight':
    case 'UltraLight':
      fontWeight = 200;
      break;
    case 'Light':
      fontWeight = 300;
      break;
    case 'Normal':
    case 'Regular':
    default:
      fontWeight = 400;
      break;
    case 'Medium':
      fontWeight = 500;
      break;
    case 'DemiBold':
    case 'SemiBold':
      fontWeight = 600;
      break;
    case 'Bold':
      fontWeight = 700;
      break;
    case 'ExtraBold':
    case 'UltraBold':
      fontWeight = 800;
      break;
    case 'Black':
    case 'Heavy':
      fontWeight = 900;
      break;
  }
  return fontWeight;
}

export function getTypographyVariants({
  variants,
  map
}) {
  let paramVariants = [
    'headline1',
    'headline2',
    'headline3',
    'headline4',
    'headline5',
    'headline6',
    'body1',
    'body2',
    'subtitle1',
    'subtitle2',
    'button',
    'button2',
    'caption',
    'overline'
  ] || variants;

  const getStyleForVariant = (variant) => {
    const data = typographyData[variant];

    let fontFamily = data.font;
    let fontWeight = getWeight(data.weight);

    const processedData = {
      fontFamily,
      fontWeight,
      fontSize: pxToRem(data.size),
      letterSpacing: pxToRem(data.spacing),
    }
    if (data.lineHeight > 0) processedData.lineHeight = pxToRem(data.lineHeight);
    if (data.textTransform === 1) processedData.textTransform = 'uppercase';
    else if (data.textTransform === 0) processedData.textTransform = 'none';

    let merge;
    switch (variant) {
      case 'headline1':
      // case 'button':
      case 'subtitle2':
        merge = {
          transform: 'translate(0, -1px)'
        };
        break;
      // case 'button2':
      case 'body2':
      case 'headline4':
      case 'headline6':
        merge = {
          transform: 'translate(0, 1px)'
        };
        break;
      case 'headline5':
      case 'subtitle1':
        merge = {
          transform: 'translate(0, 2px)'
        };
        break;
      default:
        break;
    }

    return {
      ...processedData,
      ...merge
    }
  };

  let styles = {};
  paramVariants.forEach(variant => {
    let mappedVariant = variant;
    if (map && map[variant]) mappedVariant = map[variant];
    styles[mappedVariant] = getStyleForVariant(variant);
  });

  return styles;
}
