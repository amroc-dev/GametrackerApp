import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, SafeAreaView, View, StyleSheet } from "react-native";
import CardListFlat from "./CardListFlat";
import CardListScroll from "./CardListScroll";
import { SearchContext } from "./shared/react/SearchContext";
import theme from "./Theme";

export default function SearchPage({ navigation }) {
  const { submitSearch } = useContext(SearchContext);

  function onSearchPressed() {
    submitSearch();
  }

  return (
    <View style={styles.root}>
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
