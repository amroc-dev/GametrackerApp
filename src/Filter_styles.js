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
      // marginHorizontal: theme.rem * 0.5,
      marginTop: theme.rem * 1,

      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
    },
    bodyContainer: {
      backgroundColor: theme.colors.background2,
      marginTop: 0,
      marginHorizontal: theme.rem * 0.5,
      borderRadius: theme.borderRadius,
      // borderTopLeftRadius: 0,
    },
    headerView: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      backgroundColor: rgba(0,0,0,0),// theme.colors.primary, //
      // height: theme.rowHeight * 0.5,
      marginLeft: theme.rem * 0.5,
      borderTopLeftRadius: theme.borderRadius,
      borderTopRightRadius: theme.borderRadius,
      // borderRadius: theme.borderRadius,
      marginBottom: theme.rem * 0.25,
    },
    headerText:{
      color: theme.fonts.colors.primary,
      fontSize: theme.fonts.sizes.primary2,
      fontWeight: theme.fonts.weights.bold,
      // width: 100,
      // padding: theme.rem * 0.25,
      paddingHorizontal: theme.rem * 0.25,
    },
  });