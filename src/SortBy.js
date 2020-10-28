import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, LayoutAnimation, Pressable } from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchContext } from "./shared/react/SearchContext";
import { sortOptions } from "./shared/react/SortOptions";
import cardItemStyles from "./CardItem_styles";
import theme from "./Theme";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchContext } from "./TouchContext";
import ModalDropdown from "./ModalDropdown";

export default function SortBy() {
  const { sortOption, updateSortOption } = useContext(SearchContext);

  const pickerItems = sortOptions.map((item) => ({ label: item, value: item }));

  return (
    <View style={styles.root}>
      <Text style={styles.sortByLabel}>Sort by</Text>
      <ModalDropdown
        defaultValue={sortOption}
        items={pickerItems}
        onChangeItem={(item, index) => updateSortOption(item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: 240,
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
