import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, SafeAreaView, View, StyleSheet, StatusBar } from "react-native";
import CardListFlat from "./CardListFlat";
import CardListScroll from "./CardListScroll";
import { Platform } from "react-native";
import FiltersPage from "./FiltersPage";
import { ThemeContext } from "./ThemeContext";

export default function SearchPage() {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  if (Platform.isPad) {
    return (
      <View style={[styles.root, { flexDirection: "row" }]}>
        <View style={styles.splitRoot_search}>
          <CardListScroll />
        </View>
        <View style={styles.splitRoot_filters}>
          <FiltersPage />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <CardListScroll />
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background1,
    },

    splitRoot_search: {
      flex: 1.5,
    },
    splitRoot_filters: {
      flex: 1,
    },
  });
}
