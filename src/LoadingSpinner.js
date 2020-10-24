import React from "react";
import { View, StyleSheet } from "react-native";
import { Flow } from "react-native-animated-spinkit";
import theme from "./Theme";

export default function LoadingSpinner() {
  return (
    <View style={styles.parent}>
      <Flow style={styles.spinner} size={64} color="#FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
    parent: {
      flexDirection: "row",
      justifyContent: "center",
    },
    spinner: {
      height: 100,
      paddingTop: theme.rem * 1.5,
    },
  });
