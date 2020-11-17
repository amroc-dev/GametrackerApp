import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, LayoutAnimation, Pressable } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { sortOptions } from "./shared/react/SortOptions";
import { ThemeContext } from "./shared/react/ThemeContext";
import ModalDropdown from "./ModalDropdown";

export default function SortBy() {
  const { theme } = useContext(ThemeContext);
  const { sortOption, updateSortOption } = useContext(SearchContext);

  const pickerItems = sortOptions.map((item) => ({ label: item, value: item }));

  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <Text style={styles.sortByLabel}>Sort</Text>
      <ModalDropdown
        defaultValue={sortOption}
        items={pickerItems}
        onChangeItem={(item, index) => updateSortOption(item.value)}
      />
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    root: {
      flexDirection: "row",
      width: 210,
      alignSelf: "flex-end",
      height: theme.rowHeight,
      backgroundColor: "rgba(0,0,0,0)",
      marginTop: theme.rem * 0.5,
      marginHorizontal: theme.rem * 0.5,
      zIndex: 10,
    },
    sortByLabel: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.primary2,
      alignSelf: "center",
      marginRight: theme.rem * 0.5,
    },
  });
}
