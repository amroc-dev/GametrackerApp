import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, SafeAreaView, View, StyleSheet } from "react-native";
import CardListFlat from "./CardListFlat";
import CardListScroll from "./CardListScroll";
import Searchbar from "./Searchbar";
import { SearchContext } from "./shared/react/SearchContext";
import theme from "./Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export default function SearchPage({ navigation }) {
  const { submitSearch } = useContext(SearchContext);

  function onSearchPressed() {
    submitSearch();
  }

  return (
    <View style={styles.root}>
      <Searchbar />
      {/* <Button title="Search" onPress={onSearchPressed} /> */}
      <CardListScroll />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background1,
  },
});
