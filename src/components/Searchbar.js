import React, { useContext } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { SearchContext } from "@shared/react/SearchContext";
import { ThemeContext } from "@root/ThemeContext";
import { SearchInput } from "@components/common/SearchInput";

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


      marginBottom: 0,
      borderRadius: theme.borderRadius,
      // shadowColor: theme.shadowColor,
      // shadowOpacity: theme.shadowOpacity,
      // shadowRadius: theme.shadowRadius,
      // shadowOffset: theme.shadowOffset,
      // borderWidth: theme.borderWidth,
      // borderColor: theme.borderColor,
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