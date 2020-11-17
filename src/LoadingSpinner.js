import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import { ThemeContext } from "./ThemeContext";

export default function LoadingSpinner() {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  return (
    <View style={styles.parent}>
      <Wave style={styles.spinner} size={48} color={theme.colors.primary} />
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    parent: {
      flexDirection: "row",
      justifyContent: "center",
    },
    spinner: {
      marginTop: theme.rem * 1.5,
    },
  });
}
