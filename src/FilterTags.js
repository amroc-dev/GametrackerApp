import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";
import { filterStyles, FilterHeader } from "./Filter_styles";
import { SearchBar } from "react-native-elements";
import { rgba } from "polished";

export default function FilterTags() {
  return (
    <>
      <View style={[filterStyles.outerContainer, styles.outer]}>
        <FilterHeader title={"Tags"} />
        <View style={[filterStyles.bodyContainer, styles.body]}>
          <View style={styles.innerBody}>
            <View style={styles.tags}>

            </View>
            <SearchBar
              containerStyle={styles.searchBar}
              inputContainerStyle={styles.textInput}
              inputStyle={styles.input}
              platform="ios"
              placeholder="Search for tag"
              // onChangeText={}
              // onSubmitEditing={}
              // onClear={}
              cancelButtonProps={{
                color: theme.fonts.colors.title,
              }}
              // value={}
              // returnKeyType={"search"}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginTop: theme.rem * 1,
    marginBottom: 0,
  },

  body: {
    height: "auto",
  },

  innerBody: {
    flexDirection: "column",
    flex: 1,
  },

  tags: {
    flex: 1,
    height: 200,
    alignSelf: "flex-start",
  },

  searchBar: {
    alignSelf: "flex-end",
    height: theme.rowHeight + theme.rem,
    backgroundColor: rgba(0, 0, 0, 0),

    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,

  },
  textInput: {
    height: theme.rowHeight,
    backgroundColor: "white",
    borderRadius: theme.borderRadius,
  },
  input: {},
});
