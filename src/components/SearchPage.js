import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, SafeAreaView, View, StyleSheet, StatusBar } from "react-native";
import SearchPageContent from "@components/SearchPageContent";
import SearchPageContent_FlatList from "@components/SearchPageContent_FlatList";
import { Platform } from "react-native";
import FiltersPage from "./FiltersPage";
import { transparentize, invert } from "polished";
import { ThemeContext } from "@root/ThemeContext";

export default function SearchPage() {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  if (Platform.isPad) {
    return (
      <View style={[styles.root, { flexDirection: "row" }]}>
        <View style={styles.splitRoot_search}>
          <SearchPageContent_FlatList />
        </View>
        {/* <View style={styles.splitRoot_spacer} /> */}
        <View style={styles.splitRoot_filters}>
          <FiltersPage scrollViewStyle={{paddingLeft:0}} />
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
      width: 0,
      borderRadius: 1,
      height: "100%",
      alignSelf: "center",
      marginHorizontal: theme.rem * 0.0,
      backgroundColor: transparentize(0.5, theme.colors.background2),
      opacity: 0,
    },
    splitRoot_filters: {
      flex: 1,
      // marginRight: theme.rem * 0.5,
    },
  });
}
