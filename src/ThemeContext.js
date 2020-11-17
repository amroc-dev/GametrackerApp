import React, { useState, useEffect } from "react";
const ThemeContext = React.createContext();
import { lighten, darken, rgb, rgbToColorString } from "polished";
import RootViewBackgroundColor from "react-native-root-view-background-color";
import { StyleSheet, View, Text } from "react-native";
import { extractRGB } from "./shared/react/Misc";
import merge from "merge";

const fontSize = 16;
const rem = fontSize;

const baseTheme = {
  fontSize: fontSize,
  rem: rem,
  name: "base",

  colors: {
    primary: "rgb(250, 126, 14)",
    header: null,
    background1: null,
    background2: null,
    secondary: null,

    rating: {
      good: "rgb(92, 184, 92)",
      average: "rgb(225, 180, 48)",
      bad: "rgb(225, 0, 0)",
      na: "rgba(125, 145, 165)",
    },
  },

  fonts: {
    sizes: {
      header: 1.1 * fontSize,
      primary: 1 * fontSize,
      primary2: 0.9 * fontSize,
      secondary: 0.7 * fontSize,
      mini: 0.65 * fontSize,
      rating: 1.2 * fontSize,
    },

    colors: {
      title: null,
      primary: null,
      primary2: null,
      secondary: null,
    },

    weights: {
      bold: "500",
    },
  },

  shadowColor: "rgb(0,0,0)",
  shadowOpacity: 0.15,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 0,
  },

  borderRadius: 6,
  pillBorderRadius: 100,
  rowHeight: 44,
  borderWidth: 0,//StyleSheet.hairlineWidth,
  // borderColor: "rgba(0,0,0,0.15)",

  get headerTitleStyle() {
    return {
      color: this.fonts.colors.title,
      fontSize: this.fonts.sizes.header,
      fontWeight: this.fonts.weights.bold,
    };
  },

  get headerNavButtonStyle() {
    return {
      color: this.colors.primary,
      fontSize: this.fonts.sizes.header,
      fontWeight: this.fonts.weights.bold,
    };
  },

  get shadowStyle() {
    return {
      shadowColor: this.shadowColor,
      shadowOpacity: this.shadowOpacity,
      shadowRadius: this.shadowRadius,
      shadowOffset: this.shadowOffset,
    };
  },
};

function ThemeContextProvider(props) {
  // const [theme, setTheme] = useState(getDarkTheme());
  const [theme, setTheme] = useState(getLightTheme());

  useEffect(() => {
    setRootViewBackground(theme.colors.background1);
  }, [theme]);

  function setRootViewBackground(col) {
    const bgRGB = extractRGB(col);
    RootViewBackgroundColor.setBackground(bgRGB[0], bgRGB[1], bgRGB[2], 1);
  }

  ////////////////////////////////////////////////////////////

  function getDarkTheme() {
    const primary = "rgb(240, 126, 24)";
    const background1 = "rgb(21, 23, 25)";
    const background2 = "rgb(41, 44, 47)";

    const theme = {
      name: "dark",

      colors: {
        // primary: primary,
        header: background1,
        background1: background1,
        background2: background2,
        secondary: lighten("0.15", background2).toString(),
      },

      fonts: {
        colors: {
          title: "rgb(255, 255, 255)",
          primary: "rgb(234, 234, 234)",
          primary2: "rgb(210, 210, 210)",
          secondary: "rgb(150, 150, 150)",
        },
      },

      shadowOpacity: 0.35,
    };

    return merge.recursive(baseTheme, theme);
  }

  ////////////////////////////////////////////////////////////

  useEffect( () => {
    setTheme(theme.name === 'light' ? getLightTheme() : getDarkTheme())
  })

  function getLightTheme() {
    const primary = "rgb(250, 126, 14)";
    const background1 = "rgb(241, 241, 241)";
    const background2 = "rgb(255, 255, 255)";

    const theme = {
      name: "light",

      colors: {
        // primary: primary,
        header: background1,
        background1: background1,
        background2: background2,
        secondary: darken("0.15", background2).toString(),
      },

      fonts: {
        colors: {
          title: "rgb(0, 0, 0)",
          primary: "rgb(16, 16, 16)",
          primary2: "rgb(40, 40, 40)",
          secondary: "rgb(140, 140, 140)",
        },

        weights: {
          bold: "400",
        },
      },

      shadowOpacity: 0.025,
    };

    return merge.recursive(baseTheme, theme);
  }

  return <ThemeContext.Provider value={{ theme }}>{props.children}</ThemeContext.Provider>;
}
export { ThemeContextProvider, ThemeContext };
