import { borderRadius } from "polished";
import { StyleSheet } from "react-native";
import { ThemeConsumer } from "react-native-elements";

function getStyles(theme) {
  return StyleSheet.create({
    cardItem: {
      flexDirection: "row",
      backgroundColor: theme.colors.background2,
      borderRadius: theme.borderRadius,
      marginTop: theme.rem * 0.5,
      // marginHorizontal: theme.rem * 1,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,

    },

    image: {
      width: 100,
      height: 100,
      borderRadius: theme.borderRadius,
      marginRight: theme.rem * 0.25,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      alignItems: 'center'
    },

    dataContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      padding: theme.rem * 0.5,
      // paddingHorizontal: theme.rem * 0.5,
      // backgroundColor: 'red',
    },

    topRowContainer: {
      flex: 1,
      flexWrap: "nowrap",
      flexDirection: "row",
      // backgroundColor: 'green',
    },

    bottomRowContainer: {
      flex: 1,
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: theme.rem * -1.5,
    },

    titleContainer: {},

    titleText: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      fontWeight: theme.fonts.weights.bold,
    },

    artistText: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.secondary,
      paddingTop: theme.rem * 0.15,
    },

    releaseDate: {
      flex: 1,
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.secondary,
      width: 100,
    },

    ratingContainer: {
      flex: 0.6,
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },

    ratingCell: {
      marginRight: theme.rem * 0.5,
      marginTop: theme.rem * 0.75,
      width: 32,
      height: 32,
      display: "flex",
      borderRadius: theme.borderRadius,
      justifyContent: "center",
    },

    ratingValue: {
      color: "white",
      alignSelf: "center",
      fontSize: theme.fonts.sizes.rating,
    },

    ratinCount: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.secondary,
    },

    price: {
      color: theme.fonts.colors.primary,
      flex: 0,
      fontSize: theme.fonts.sizes.primary,
    },
  });
}

export default getStyles;
