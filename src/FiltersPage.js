import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import { ThemeContext } from  "./shared/react/ThemeContext";
import FilterTags from "./FilterTags";
import FilterDevice from "./FilterDevice";
import FilterPopularity from "./FilterPopularity";

export default function FiltersPage() {
  const {theme} = useContext(ThemeContext)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  const styles = StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background1,
    },
    scrollView: {
      height: "100%",
    },
  });
  
  
  return (
    <View style={styles.root} >
      <ScrollView
      scrollEnabled={scrollEnabled}
      indicatorStyle="white"
      decelerationRate="fast"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag" style={styles.scrollView}>
        <View>
          <FilterTags />
          <FilterDevice />
          <FilterPopularity setScrollEnabled={setScrollEnabled} />
          <View style={{marginTop:theme.rem}} />
        </View>
      </ScrollView>
    </View>
  );
}

