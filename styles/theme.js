import { RFValue } from 'react-native-responsive-fontsize';

/* colors */
export const darkThTextColor = '#fff';
const lightThTextColor = '#000';
const darkThBackgrColor = '#000';
const lightThBackgrColor = '#fff';
const darkGreyBorder = '#4F4F4F';
const opaqueGrey = 'rgba(79,79,79, 0.6)';
export const opaqueDark = 'rgba(0, 0, 0, 0.6)';

export const highLight = '#FFD184';
export const calSelHighLight = '#fff';
export const buttTypes = {
  error: '#ff6961',
  info: '#FFAE78',
  accept: '#82d355',
  neutral: '#4F4F4F',
  nav: '#add8e6',
};

export const whiteBackground = 'rgba(255, 255, 255, 0.8)';
// calendar divider colors
export const calDivColors = 'rgb(63, 72, 204)';
export const transparentBorders = 'rgba(0, 0, 0, 0)';
const pinkGradColors = [
  'transparent',
  'rgba(186,85,211, 0.2)',
  'rgba(186,85,211, 0.4)',
  'rgba(255,255,255, 1)',
  'rgba(186,85,211, 0.4)',
  'rgba(186,85,211, 0.2)',
  'transparent',
];
const blueGradColors = [
  'transparent',
  'rgba(0,0,160, 0.2)',
  'rgba(0,0,160, 0.4)',
  'rgba(255,255,255, 1)',
  'rgba(0,0,160, 0.4)',
  'rgba(0,0,160, 0.2)',
  'transparent',
];
const ltBlueGradColors = [
  'transparent',
  'rgba(80,80,240, 0.2)',
  'rgba(80,80,240, 0.4)',
  'rgba(255,255,255, 1)',
  'rgba(80,80,240, 0.4)',
  'rgba(80,80,240, 0.2)',
  'transparent',
];
/* fonts */
export const titleFontSize = RFValue(30);
export const subTitFontSize = RFValue(25);
export const simpleTextFS = RFValue(20);
export const simpleTextContDim = 2 * simpleTextFS;
export const smallTextFS = RFValue(15);
export const smallTextContDim = 2 * smallTextFS;
export const ultraSmTextFS = RFValue(12);
export const LIconSize = RFValue(45);
export const iconSize = RFValue(40);
export const interIconSize = RFValue(35);
export const smallIconSize = RFValue(30);
export const sSmallIconSize = RFValue(24);
export const ultraSmallIconSize = RFValue(16);
/* paddings */
export const titlePadding = 8;
export const listItemPadding = 15; // padding for top and bottom
export const listItemPadDD = 5;
export const taskItemPad = 5;
export const txtInputPad = 2;
/* heights */
// titleDivHeight - currently not used anywhere
export const titleDivHeight = 15;
// NOTE: we do not set this height, the checkbox we use
// has a hardcoded height to it and the height
// is this
export const checkBoxHeight = 32;
/* borders */
export const titleBorderWidth = 5;
export const simpleBorderWidth = 1;

export const darkBasic = {
  backgroundColor: darkThBackgrColor,
  invBackgrColor: lightThBackgrColor,
  invTextColor: lightThTextColor,
  textColor: darkThTextColor,
  placeHolderColor: 'rgba(255, 255, 255, 0.6)',
  highLightHolderCol: 'rgba(255, 209, 132, 0.6)',
  highLight,
  gradColors: ltBlueGradColors,
  listItemBorderColor: darkGreyBorder,
  strongDivColor: darkThTextColor,
  inputUnderline: darkGreyBorder,
  darkGreyBorder,
  buttTypes,
  subItemBack: opaqueGrey,
};
