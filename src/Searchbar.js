import React from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import cardItemStyles from "./CardItem_styles";
import theme from "./Theme";

export default function Searchbar() {
  return (
    <View style={styles.root}>
      <TextInput style={styles.textInput} placeholder="Search for name or tag"></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      height: 34,
      backgroundColor: "white",
      marginTop: theme.rem * 0.5,
      marginHorizontal: theme.rem * 0.5,
      borderRadius: theme.borderRadius,
    },
    textInput: {
      flex: 1,
      backgroundColor: "white",
      height: "100%",
      borderRadius: theme.borderRadius,
      marginHorizontal: theme.rem * 0.5,
    },
    searchButton: {
      backgroundColor: theme.colors.primary,
    },
    // spinner: {
    //   marginTop: theme.rem * 1.5,
    // },
  });
