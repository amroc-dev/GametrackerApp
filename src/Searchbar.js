import React, { useContext } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import cardItemStyles from "./CardItem_styles";
import theme from "./Theme";
import { SearchInput } from "./Common";

export default function Searchbar() {
  const { submitSearch, searchTerm, setSearchTerm, clearSearchTerm } = useContext(SearchContext);

  function onSubmit({ nativeEvent }) {
    setSearchTerm(nativeEvent.text);
    submitSearch();
  }

  return (
    // <SearchBar
    //   containerStyle={styles.root}
    //   inputContainerStyle={styles.textInput}
    //   inputStyle={styles.input}
    //   platform="ios"
    //   placeholder="Search for name or tag"
    //   onChangeText={setSearchTerm}
    //   onSubmitEditing={onSubmit}
    //   onClear={() => clearSearchTerm()}
    //   cancelButtonProps={{
    //     color: theme.fonts.colors.title,
    //   }}
    //   value={searchTerm}
    //   returnKeyType={"search"}
    // />
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

const styles = StyleSheet.create({
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
