import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

export default function LoadingSpinner(props) {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  return (
    <View style={styles.parent}>
      <Wave style={styles.spinner} size={48} color={theme.colors.primary} />
    </View>
  );
}

LoadingSpinner.propTypes = {
  delayMs: PropTypes.number
};


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
