import {lighten, darken} from 'polished';

const primary = 'rgb(26, 155, 215)';
const background1 = 'rgb(42, 63, 78)';
const background2 = 'rgb(78, 94, 108)';
// const background1 = 'rgb(34, 38, 38)';
// const background2 = 'rgb(48, 51, 51)';

const fontSize = 17;
const rem = fontSize;

const theme = {
  rem: rem,

  colors: {
    primary: primary,
    primaryLight: lighten('0.1', primary),
    background1: background1,
    background2: background2,
    secondary: lighten('0.25', background2),
  },

  fonts: {
    colors: {
      title: 'rgb(255, 255, 255)',
      primary: 'rgb(234, 234, 234)',
      secondary: 'rgb(150, 158, 166)',
    },

    sizes: {
      primaryBold: 1 * fontSize,
      primary: 1 * fontSize,
      primary2: 0.9 * fontSize,
      secondary: 0.7 * fontSize,
      rating: 1.2 * fontSize,
    },
  },

  shadowColor: '#000',
  shadowOpacity: 0.35,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 0,
  },

  borderRadius: 8,
};

export default theme;
