import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";
import { MakeLabel, popularityFilterCategories } from "./shared/react/PopularityFilterCategories";
import { borderRadius } from "polished";

function SearchPill({ name, clickCallback }) {
  return (
    <Button buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={() => clickCallback(name)}
      title={name}
      type="solid"
      color={theme.colors.secondary}
    />
  );
}

export default function SearchPills() {
  const {
    searchTags,
    removeSearchTag,
    clearSearchTerm,
    deviceFilter,
    toggleDeviceFilter,
    popularityFilterIndex,
    setPopularityFilterIndex,
  } = useContext(SearchContext);

  const { submittedSearchTerm } = useContext(SearchResultsContext);

  function onTagPillClick(name) {
    removeSearchTag(name);
  }

  let pillElems = [];

  // search pill
  if (submittedSearchTerm.length > 0) {
    pillElems.push(
      <SearchPill
        key={pillElems.length}
        name={submittedSearchTerm}
        // name={"\"" + submittedSearchTerm + "\""}
        clickCallback={() => {
          clearSearchTerm();
        }}
      />
    );
  }

  // tags pills
  searchTags.map((e) => {
    pillElems.push(
      <SearchPill
        key={pillElems.length}
        name={e}
        clickCallback={onTagPillClick}
      />
    );
    return null;
  });


  // // device filter pills
  // function onDevicePillClick(e) {
  //   const val = e.target.value;
  //   toggleDeviceFilter(val);
  // }

  // const filter = { ...deviceFilter };
  // Object.keys(filter).forEach((i) => {
  //   if (filter[i]) {
  //     pillElems.push(
  //       <SearchPill
  //         key={pillElems.length}
  //         name={i}
  //         clickCallback={onDevicePillClick}
  //       />
  //     );
  //   }
  //   return filter[i];
  // });

  // // popularity filter pill
  // function onPopularityPillClick(e) {
  //   setPopularityFilterIndex(popularityFilterCategories.length - 1)
  // }

  // if (popularityFilterCategories[popularityFilterIndex] !== -1) {
  //   pillElems.push(
  //     <SearchPill
  //       key={pillElems.length}
  //       name={"Popularity < " + MakeLabel(popularityFilterIndex)}
  //       clickCallback={onPopularityPillClick}
  //     />
  //   );
  // }

  return <View style={styles.container}>{pillElems}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: theme.rem * 0.5,
    marginBottom: theme.rem * -0.5,
    // justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0)",
  },
  button: {
    backgroundColor: theme.colors.secondary,
    marginBottom: theme.rem * 0.5,
    marginRight: theme.rem * 0.4,
    borderRadius: theme.borderRadius,
  },
  title: {
    fontSize: theme.fonts.sizes.primary2,
  }
});