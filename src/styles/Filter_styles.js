import { rgba, readableColor } from "polished";
import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";

export function getFilterStyles(theme) {
  return StyleSheet.create({
    filterTextSelected: {
      color: theme.name === "light" ? readableColor(theme.fonts.colors.title) : theme.fonts.colors.title,
    },
    multiSliderParentContainer: {
      marginHorizontal: theme.rem,
      marginTop: -theme.rem * 0.25,
      marginBottom: theme.rem * 0.25,
    },
  });
}
