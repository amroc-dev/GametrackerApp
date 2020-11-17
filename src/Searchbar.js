import React, { useContext } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { ThemeContext } from "./shared/react/ThemeContext";
import { SearchInput } from "./Common";

export default function Searchbar() {
  const { theme } = useContext(ThemeContext);
  const { submitSearch, searchTerm, setSearchTerm } = useContext(SearchContext);

  function onSubmit({ nativeEvent }) {
    setSearchTerm(nativeEvent.text.trim());
    submitSearch();
  }

  const styles = getStyles(theme)

  return (
    <SearchInput
      style={styles.searchInput}
      placeholder="Search for name or tag"
      value={searchTerm}
      onSubmitEditing={onSubmit}
      onChangeText={setSearchTerm}
      returnKeyType="search"
      useCancelButton={true}
    ></SearchInput>
  );
}


function getStyles(theme) {
  return StyleSheet.create({
    searchInput: {
      margin: theme.rem * 0.5,
      marginBottom: 0,
    },

    root: {
      // flexDirection: "row",
      height: theme.rowHeight,
      // backgroundColor: "rgba(0,0,0,0)",
      marginTop: theme.rem * 0.5,
      borderRadius: theme.borderRadius,
      // marginHorizontal: -theme.rem * 0.5,
      // borderRadius: theme.borderRadius,
    },
    textInput: {
      flex: 1,
      height: "100%",
      marginVertical: -12.8,
      backgroundColor: "white",
      borderRadius: theme.borderRadius,
      // backgroundColor: theme.colors.background2,
      // color: "white",
      // borderRadius: theme.borderRadius,
    },
    input: {
      // color: theme.colors.primary,
    },
    cancelButton: {
      backgroundColor: "red",
    },
  });
}