import { rgba } from "polished";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import theme, { headerTitleStyle } from "./Theme";


export function FilterHeader( {title} ) {
  return (
    <View style={filterStyles.headerView}>
      <Text style={filterStyles.headerText}>{title}</Text>
    </View>
  )
}

export const filterStyles = StyleSheet.create({
    outerContainer: {
      marginHorizontal: theme.rem * 0.5,
      marginTop: theme.rem * 1,

      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
    },
    bodyContainer: {
      backgroundColor: theme.colors.background2,
      marginTop: 0,
      borderRadius: theme.borderRadius,
    },
    headerView: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      backgroundColor: rgba(0,0,0,0),
      height: theme.rowHeight * 0.75,
      marginLeft: theme.rem * 0.5,
      borderTopLeftRadius: theme.borderRadius,
      borderTopRightRadius: theme.borderRadius,
    },
    headerText:{
      color: theme.fonts.colors.primary,
      fontSize: theme.fonts.sizes.primary2,
      fontWeight: theme.fonts.weights.bold,
      width: 80,
    },
  });