import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";

export default function FiltersPage() {
  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <Text>filters</Text>
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
