import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, LayoutAnimation } from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchContext } from "./shared/react/SearchContext";
import { sortOptions } from "./shared/react/SortOptions";
import cardItemStyles from "./CardItem_styles";
import theme from "./Theme";
import DropDownPicker from "react-native-dropdown-picker";

export default function SortBy() {
  const { sortOption, updateSortOption } = useContext(SearchContext);

  const pickerItems = sortOptions.map((item) => ({ label: item, value: item }));

  function onOpen() {
  }

  function onClose() {
  }

  return (
    <View style={styles.root}>
      <Text style={styles.sortByLabel}>Sort by</Text>
      <DropDownPicker
        style={styles.dropdownStyle}
        containerStyle={styles.dropdownContainer}
        dropDownStyle={styles.dropdown}
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholder}
        defaultValue={sortOption}
        items={pickerItems}
        onOpen={onOpen}
        onOpen={onClose}
        arrowColor="white"
        dropDownMaxHeight={500}
        onChangeItem={(item, index) => updateSortOption(item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: theme.rowHeight,
    backgroundColor: "rgba(0,0,0,0)",
    marginTop: theme.rem * 0.5,
    marginHorizontal: theme.rem * 0.5,
    zIndex: 100,
  },
  sortByLabel: {
    color: theme.fonts.colors.secondary,
    fontSize: theme.fonts.sizes.primary2,
    alignSelf: "center",
    marginRight: theme.rem * 0.5,
  },
  dropdownStyle: {
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
  },
  dropdownContainer: {
    flex: 0.5,
    borderWidth: 0,
  },
  dropdown: {
    marginTop: theme.rem * 0.25,
    marginRight: theme.rem * 2,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    borderWidth: 0,
    shadowColor: theme.shadowColor,
    shadowOpacity: theme.shadowOpacity,
    shadowRadius: theme.shadowRadius,
    shadowOffset: theme.shadowOffset,
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  labelStyle: {
    color: "white",
    fontSize: theme.fonts.sizes.primary,
    fontWeight: "500",
    marginLeft: theme.rem * 0.75,
  },
  selectedLabelStyle: {},
});
