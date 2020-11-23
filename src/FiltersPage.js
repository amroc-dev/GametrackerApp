import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import { ThemeContext } from  "./ThemeContext";
import FilterTags from "./FilterTags";
import FilterDevice from "./FilterDevice";
import FilterPopularity from "./FilterPopularity";
import { HeaderSpace, Separator } from "./Common";

export default function FiltersPage() {
  const {theme} = useContext(ThemeContext)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  const styles = getStyles(theme)
  
  return (
    <View style={styles.root} >
      <ScrollView
      scrollEnabled={scrollEnabled}
      indicatorStyle={theme.isDark ? "white" : "black"}
      decelerationRate="fast"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="on-drag" style={styles.scrollView}>
        <View>
          <HeaderSpace />
          <Spacer size={0.5} />
          <FilterTags />
          <Spacer size={2} />
          <FilterDevice />
          <Spacer size={2} />
          <FilterPopularity setScrollEnabled={setScrollEnabled} />
          <View style={{marginTop:theme.rem}} />
        </View>
      </ScrollView>
    </View>
  );
}

function Spacer({size}) {
  const {theme} = useContext(ThemeContext)
  const marginSize = size ? theme.rem * size : theme.rem;
  return <View style={{marginTop:marginSize}}/>
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
