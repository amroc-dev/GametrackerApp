import React, { useState, useEffect } from "react";
const ThemeContext = React.createContext();
import { lighten, darken, rgb, rgbToColorString } from "polished";
import RootViewBackgroundColor from "react-native-root-view-background-color";
import { extractRGB } from "./shared/react/Misc";
import merge from "merge";

const fontSize = 16;
const rem = fontSize;

const baseTheme = {
  fontSize: fontSize,
  rem: rem,

  colors: {
    primary: null,
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

  borderRadius: 6,
  pillBorderRadius: 100,
  rowHeight: 44,
};

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(getDarkTheme());

  useEffect( () => {
    setRootViewBackground(theme.colors.background1)
  }, [theme])

  function setRootViewBackground( col ) {
    const bgRGB = extractRGB(col);
    RootViewBackgroundColor.setBackground(bgRGB[0], bgRGB[1], bgRGB[2], 1);
  }

  function getDarkTheme() {
    const primary_dark = "rgb(240, 126, 24)";
    const background1_dark = "rgb(21, 23, 25)";
    const background2_dark = "rgb(41, 44, 47)";

    const dark = {
      colors: {
        primary: primary_dark,
        header: background1_dark,
        background1: background1_dark,
        background2: background2_dark,
        secondary: lighten("0.15", background2_dark).toString(),
      },

      fonts: {
        colors: {
          title: "rgb(255, 255, 255)",
          primary: "rgb(234, 234, 234)",
          primary2: "rgb(210, 210, 210)",
          secondary: "rgb(150, 150, 150)",
        },
      }
    };
    
    return merge.recursive(baseTheme, dark)
  }

  function setLightTheme() {}

  return <ThemeContext.Provider value={{ theme }}>{props.children}</ThemeContext.Provider>;
}
export { ThemeContextProvider, ThemeContext };
