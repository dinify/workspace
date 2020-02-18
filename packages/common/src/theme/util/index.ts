import typographyData from '../../lib/typography.json';

export function pxToRem(px: number, unit = 'rem') {
  return `${px / 16}${unit}`;
}

export function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

export function getLineHeight(px: number) {
  //using baseline grid of 4dp
  return Math.ceil(px / 4) * 4;
}

export type TypographyVariant = 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'headline6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'button' | 'button2' | 'caption' | 'overline';
export type WeightType = 'Hairline' | 'Thin' | 'ExtraLight' | 'UltraLight' | 'Light' | 'Normal' | 'Regular' | 'Medium' | 'DemiBold' | 'SemiBold' | 'Bold' | 'ExtraBold' | 'UltraBold' | 'Black' | 'Heavy';
export function getWeight(name: WeightType) {
  let fontWeight;
  switch (name) {
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

interface Params {
  variants: TypographyVariant[],
  map: { [key: string]: string }
}
export function getTypographyVariants({
  variants,
  map
}: Params) {
  const paramVariants: TypographyVariant[] = [
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

  const getStyleForVariant = (variant: TypographyVariant) => {
    const data = (typographyData as any)[variant];

    let fontFamily = data.font;
    let fontWeight = getWeight(data.weight);

    const processedData: React.CSSProperties = {
      fontFamily,
      fontWeight,
      fontSize: pxToRem(data.size),
      letterSpacing: pxToRem(data.spacing),
    }
    if (data.lineHeight > 0) processedData.lineHeight = pxToRem(data.lineHeight);
    if (data.textTransform === 1) processedData.textTransform = 'uppercase';
    else if (data.textTransform === 0) processedData.textTransform = 'none';

    return processedData;
  };

  const styles: { [key: string]: React.CSSProperties } = {};
  paramVariants.forEach(variant => {
    let mappedVariant: string = variant;
    if (map && map[variant]) mappedVariant = map[variant];
    styles[mappedVariant] = getStyleForVariant(variant);
  });

  return styles;
}
