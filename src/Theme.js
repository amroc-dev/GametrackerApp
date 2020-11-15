import { lighten, darken, rgb, rgbToColorString } from "polished";

// let primary = "rgb(26, 155, 215)";
// const primary = "rgb(29, 172, 82)";
// const primary = "rgb(92, 184, 92)";
// const background1 = "rgb(42, 63, 78)";
// const background2 = "rgb(78, 94, 108)";
const primary = "rgb(240, 126, 24)";
const background1 = "rgb(21, 23, 25)";
const background2 = "rgb(51, 54, 57)";

// const primary = lighten("0.25", background1);
// const background1 = 'rgb(33, 38, 45)';
// const background2 = 'rgb(48, 55, 66)';

const fontSize = 16;
const rem = fontSize;

const theme = {
  rem: rem,

  colors: {
    primary: primary,
    header: background1,
    background1: background1,
    background2: background2,
    secondary: lighten("0.15", background2).toString(),

    rating: {
      good: 'rgb(92, 184, 92)',
      average: 'rgb(225, 180, 48)',
      bad: 'rgb(225, 0, 0)',
      na: 'rgba(125, 145, 165)',
    }
  },

  fonts: {
    colors: {
      title: "rgb(255, 255, 255)",
      primary: "rgb(234, 234, 234)",
      primary2: "rgb(210, 210, 210)",
      secondary: "rgb(150, 150, 150)",
    },

    sizes: {
      header: 1.1 * fontSize,
      primary: 1 * fontSize,
      primary2: 0.9 * fontSize,
      secondary: 0.7 * fontSize,
      mini: 0.65 * fontSize,
      rating: 1.2 * fontSize,
    },

    weights: {
      bold: "500",
      bold2: "600",
    },
  },

  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 0,
  },

  borderRadius: 10,
  rowHeight: 44,
};

export default theme;

export const headerTitleStyle = {
  color: theme.fonts.colors.title,
  fontSize: theme.fonts.sizes.header,
  fontWeight: theme.fonts.weights.bold,
};

export const headerSideButtonTitleStyle = {
  color: theme.colors.primary,
  fontSize: theme.fonts.sizes.header,
  fontWeight: theme.fonts.weights.bold,
};

export const shadowStyle = {
  shadowColor: theme.shadowColor,
  shadowOpacity: theme.shadowOpacity,
  shadowRadius: theme.shadowRadius,
  shadowOffset: theme.shadowOffset,
}

// export const navButtonStyle = {
//   color: theme.fonts.colors.title,
// }

export const navButtonStyle = headerSideButtonTitleStyle;

