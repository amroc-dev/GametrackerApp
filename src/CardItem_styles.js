import { StyleSheet } from "react-native";

function getStyles(theme) {
  return StyleSheet.create({
    cardItem: {
      flexDirection: "row",
      backgroundColor: theme.colors.background2,
      borderRadius: theme.borderRadius,
      marginTop: theme.rem * 0.5,
      marginHorizontal: theme.rem * 0.5,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
    },

    image: {
      width: 100,
      height: 100,
      borderRadius: theme.borderRadius,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
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
    },

    releaseDate: {
      flex: 1,
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.secondary,
      width: 100,
    },

    ratingContainer: {
      flex: 1,
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
      marginBottom: theme.rem * 0.15,
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
      color: "white",
      flex: 0,
      fontSize: theme.fonts.sizes.primary,
    },
  });
}

export default getStyles;
