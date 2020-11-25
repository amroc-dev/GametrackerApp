import React, { useState, useEffect } from "react";
const ThemeContext = React.createContext();
import { lighten, darken, rgb, rgbToColorString } from "polished";
import RootViewBackgroundColor from "react-native-root-view-background-color";
import { StyleSheet, View, Text, LayoutAnimation } from "react-native";
import { extractRGB } from "./shared/react/Misc";
import { Platform } from "react-native";
import merge from "merge";

function getBaseTheme() {
  const fontSize = 16;
  const rem = fontSize;

  return {
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
        na: "rgb(125, 125, 125)",
      },
    },

    fonts: {
      sizes: {
        header: 1.1 * fontSize,
        primary: 1 * fontSize,  
        primary2: 0.9 * fontSize,
        secondary: 0.75 * fontSize,
        mini: 0.65 * fontSize,
        rating: 1.0 * fontSize,
      },

      colors: {
        title: null,
        primary: null,
        primary2: null,
        secondary: null,
      },

      weights: {
        regular: "400",
        bold: "500",
      },
    },

    shadowColor: "rgb(0,0,0)",
    shadowOpacity: 0.0,
    shadowOpacity_dropdown: 0.35,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    borderRadius: 6,
    borderRadius2: 12,
    pillBorderRadius: 100,
    pillHorizontalPadding: rem * 0.66,
    pillVerticalPadding: rem * 0.425,
    rowHeight: 44,
    borderWidth: 0,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(0,0,0,0.05)",

    fadeSpeed: 200,

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

    get noShadowStyle() {
      return {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      };
    },

    get isDark() {
      return this.name === "dark";
    },
    get isLight() {
      return this.name === "light";
    },
    get searchPageTopPadding() {
      return rem * (Platform.isPad ? 0.5 : 0.5);
    },
  };
}

function ThemeContextProvider(props) {
  // const [theme, setTheme] = useState(getDarkTheme());
  const [theme, setTheme] = useState(getLightTheme());

  useEffect(() => {
    const bgRGB = extractRGB(theme.colors.background1);
    RootViewBackgroundColor.setBackground(bgRGB[0], bgRGB[1], bgRGB[2], 1);
  }, [theme]);

  function setThemeWithName(name) {
    if (name === "light") setTheme(getLightTheme());
    else if (name === "dark") setTheme((p) => getDarkTheme());
  }

  ////////////////////////////////////////////////////////////

  function getDarkTheme() {
    const primary = "rgb(230, 126, 34)";
    const background1 = "rgb(21, 23, 25)";
    const background2 = "rgb(41, 44, 47)";

    const theme = {
      name: "dark",

      colors: {
        // primary: primary,
        header: background2,
        background1: background1,
        background2: background2,
        secondary: lighten("0.15", background2).toString(),

        rating: {
          na: "rgb(125, 125, 125)",
        },
      },

      fonts: {
        colors: {
          title: "rgb(255, 255, 255)",
          primary: "rgb(234, 234, 234)",
          primary2: "rgb(210, 210, 210)",
          secondary: "rgb(150, 150, 150)",
        },
      },

      shadowOpacity: 0.0,
    };

    return merge.recursive(getBaseTheme(), theme);
  }

  ////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   setTheme(theme.name === "light" ? getLightTheme() : getDarkTheme());
  // });

  function getLightTheme() {
    const primary = "rgb(54, 164, 234)"; //"rgb(33, 149, 211)";
    const background1 = "rgb(240, 244, 245)"; //"rgb(240, 244, 245)"; //    "
    const background2 = "rgb(255, 255, 255)";

    const theme = {
      name: "light",

      colors: {
        primary: primary,
        header: background2,
        background1: background1,
        background2: background2,
        secondary: rgb(213, 217, 221).toString(), //darken(0.09, background1).toString(),

        rating: {
          na: "rgb(175, 175, 175)",
        },
      },

      fonts: {
        colors: {
          title: "rgb(0, 0, 0)",
          primary: "rgb(16, 16, 16)",
          primary2: "rgb(40, 40, 40)",
          secondary: "rgb(140, 140, 140)",
        },

        // weights: {
        //   bold: "400",
        // },
      },

      shadowOpacity: 0.0,
      // shadowRadius: 1,
    };

    return merge.recursive(getBaseTheme(), theme);
  }

  function toggleTheme() {
    if (theme.isDark) setThemeWithName("light");
    else setThemeWithName("dark");
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeWithName,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
export { ThemeContextProvider, ThemeContext };
