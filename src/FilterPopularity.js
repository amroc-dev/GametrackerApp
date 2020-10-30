import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";
import { filterStyles, FilterHeader } from "./Filter_styles";

export default function FilterPopularity() {
  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"Popularity"} />
      <View style={[filterStyles.bodyContainer, styles.body]}></View>
    </View>
);
}

const styles = StyleSheet.create({
outer: {

},

body: {
  height: 80,
},
});
