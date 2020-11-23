import { rgba, readableColor } from "polished";
import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { ThemeContext } from "./ThemeContext"


export function FilterHeader( {title} ) {
  const {theme} = useContext(ThemeContext)

  const filterStyles = getFilterStyles(theme)
  
  return (
    <View style={filterStyles.headerView}>
      <Text style={filterStyles.headerText}>{title}</Text>
    </View>
  )
}

export function getFilterStyles(theme) {
  return StyleSheet.create({
    outerContainer: {
      // marginHorizontal: theme.rem * 0.5,
    },
    bodyContainer: {
      backgroundColor: theme.colors.background2,
      marginTop: 0,
      marginHorizontal: theme.rem * 0.5,
      borderRadius: theme.borderRadius,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
      borderTopLeftRadius: 0,
    },
    headerView: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      backgroundColor: theme.colors.background2, //
      // height: theme.rowHeight * 0.5,
      marginLeft: theme.rem * 0.5,
      borderTopLeftRadius: theme.borderRadius,
      borderTopRightRadius: theme.borderRadius,
      // borderRadius: theme.borderRadius,
      // marginBottom: theme.rem * 0.25,
      padding: theme.rem * 0.5,

    },
    headerText:{
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.primary2,
      fontWeight: theme.fonts.weights.bold,

      // width: 100,
      // padding: theme.rem * 0.25,
      paddingHorizontal: theme.rem * 0.25,
    },
    filterTextSelected: {
      color: theme.name === 'light' ? readableColor(theme.fonts.colors.title) : theme.fonts.colors.title,
    }
  });
}