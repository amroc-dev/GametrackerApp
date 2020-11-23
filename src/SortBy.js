import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, LayoutAnimation, Pressable } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { sortOptions } from "./shared/react/SortOptions";
import { ThemeContext } from "./ThemeContext";
import ModalDropdown from "./ModalDropdown";

export default function SortBy() {
  const { theme } = useContext(ThemeContext);
  const { sortOption, updateSortOption } = useContext(SearchContext);

  const pickerItems = sortOptions.map((item) => ({ label: item, value: item }));

  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <Text style={styles.sortByLabel}>Sort</Text>
      <View style={styles.dropdownContainer}>
        <ModalDropdown
          defaultValue={sortOption}
          items={pickerItems}
          onChangeItem={(item, index) => updateSortOption(item.value)}
        />
      </View>
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    root: {
      flexDirection: "row",
      alignSelf: "flex-end",
      height: theme.rowHeight,
      marginTop: theme.rem * 0.5,
      // marginHorizontal: theme.rem * 0.5,
      zIndex: 10,
    },
    dropdownContainer: {
      width: 170,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: theme.shadowOffset,
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
    },
    sortByLabel: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.primary2,
      fontWeight: theme.fonts.weights.bold,
      alignSelf: "center",
      marginRight: theme.rem * 0.5,
    },
  });
}
