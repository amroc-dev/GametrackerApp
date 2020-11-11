import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";
import FilterTags from "./FilterTags";
import FilterDevice from "./FilterDevice";
import FilterPopularity from "./FilterPopularity";

export default function FiltersPage() {
  return (
    <View style={styles.root}>
      <ScrollView 
      decelerationRate="fast"
      keyboardDismissMode="on-drag" style={styles.scrollView}>
        <View>
          <FilterTags />
          <FilterDevice />
          <FilterPopularity />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background1,
  },
  scrollView: {
    height: "100%",
  },
});
