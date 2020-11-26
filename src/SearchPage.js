import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, SafeAreaView, View, StyleSheet, StatusBar } from "react-native";
import SearchPageContent from "./SearchPageContent";
import SearchPageContent_FlatList from "./SearchPageContent_FlatList";
import { Platform } from "react-native";
import FiltersPage from "./FiltersPage";
import { transparentize, invert } from "polished";
import { ThemeContext } from "./ThemeContext";

export default function SearchPage() {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  if (Platform.isPad) {
    return (
      <View style={[styles.root, { flexDirection: "row" }]}>
        <View style={styles.splitRoot_search}>
          <SearchPageContent_FlatList />
          {/* <SearchPageContent /> */}
        </View>
        {/* <View style={styles.splitRoot_spacer} /> */}
        <View style={styles.splitRoot_filters}>
          <FiltersPage />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <SearchPageContent_FlatList />
      {/* <SearchPageContent /> */}
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background1,
      // shadowColor: 'black',
      // shadowOpacity: 0.1,
      // shadowRadius: 8,
      // shadowOffset: theme.shadowOffset,
    },

    splitRoot_search: {
      flex: 1.45,
      // marginLeft: theme.rem * 0.5,
    },
    splitRoot_spacer: {
      width: 2,
      borderRadius: 1,
      height: "75%",
      alignSelf: "center",
      backgroundColor: theme.colors.background2,
    },
    splitRoot_filters: {
      flex: 1,
      // marginRight: theme.rem * 0.5,
    },
  });
}
