import { borderRadius, transparentize } from "polished";
import { StyleSheet } from "react-native";
import { ThemeConsumer } from "react-native-elements";

function getStyles(theme) {
  
  const cardHeight = 200;
  const cardSpacing = theme.rem * 0.5;
  
  return StyleSheet.create({
    
    cardHeight: cardHeight,
    cardSpacing: cardSpacing,
    
    cardItem: {
      flexDirection: "row",
      backgroundColor: theme.colors.background2,
      borderRadius: theme.borderRadius,
      marginTop: cardSpacing,
      // marginHorizontal: theme.rem * 1,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,

    },

    image: {
      width: "100%",
      height: cardHeight,
      borderRadius: theme.borderRadius,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      alignItems: 'center'
    },

    dataContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      padding: theme.rem * 0.5,
      paddingHorizontal: theme.rem * 0.65,
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
      flex: 0.75,
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },

    ratingCell: {
      marginRight: theme.rem * 0.5,
      marginTop: theme.rem * 0.75,
      width: 38,
      height: 32,
      display: "flex",
      borderRadius: theme.borderRadius,
      justifyContent: "center",
      alignItems: 'center',
    },

    ratingValue: {
      color: "white",
      paddingLeft: 1,
      fontSize: theme.fonts.sizes.rating,
      fontWeight: theme.fonts.weights.bold,
    },

    ratingCount: {
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
