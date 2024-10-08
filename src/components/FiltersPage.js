import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "@shared/react/SearchContext";
import { SearchResultsContext } from "@shared/react/SearchResultsContext";
import { ThemeContext } from "@root/ThemeContext";
import FilterTags from "./FilterTags";
import FilterDevice from "./FilterDevice";
import FilterPopularity from "./FilterPopularity";
import FilterRating from "./FilterRating";
import FilterYear from "./FilterYear";
import { HeaderSpace, Separator, Spacer } from "@components/common/Misc";

export default function FiltersPage( {scrollViewStyle}) {
  const { theme } = useContext(ThemeContext);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const styles = getStyles(theme);

  const spacer = <Spacer size={theme.rem * 2} />;

  return (
    <View style={styles.root}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        indicatorStyle={theme.isDark ? "white" : "black"}
        decelerationRate="fast"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, scrollViewStyle]}
      >
        <View>
          <HeaderSpace />
          <Spacer size={theme.searchPageTopPadding} />
          <FilterTags />
          {spacer}
          <FilterDevice />
          {spacer}
          <FilterPopularity setScrollEnabled={setScrollEnabled} />
          {spacer}
          <FilterRating setScrollEnabled={setScrollEnabled} />
          {/* {spacer}
          <FilterYear setScrollEnabled={setScrollEnabled} /> */}
          {spacer}
          {/* <View style={{marginTop:theme.rem}} /> */}
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
      paddingHorizontal: theme.pageHorizontalPadding,
    },
  });
}
