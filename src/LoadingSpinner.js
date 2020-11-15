import React from "react";
import { View, StyleSheet } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import theme from "./Theme";

export default function LoadingSpinner() {
  return (
    <View style={styles.parent}>
      <Wave style={styles.spinner} size={48} color={theme.fonts.colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
    parent: { 
      flexDirection: "row",
      justifyContent: "center",
    },
    spinner: {
      marginTop: theme.rem * 1.5,
    },
  });
