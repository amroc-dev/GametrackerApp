import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import { ThemeContext } from  "./ThemeContext";
import FilterTags from "./FilterTags";
import FilterDevice from "./FilterDevice";
import FilterPopularity from "./FilterPopularity";
import { HeaderSpace } from "./Common";

export default function FiltersPage() {
  const {theme} = useContext(ThemeContext)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  const styles = getStyles(theme)
  
  return (
    <View style={styles.root} >
      <ScrollView
      scrollEnabled={scrollEnabled}
      indicatorStyle="white"
      decelerationRate="fast"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="on-drag" style={styles.scrollView}>
        <View>
          <HeaderSpace />
          <FilterTags />
          <FilterDevice />
          <FilterPopularity setScrollEnabled={setScrollEnabled} />
          <View style={{marginTop:theme.rem}} />
        </View>
      </ScrollView>
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background1,
    },
    scrollView: {
      height: "100%",
    },
  });
}
