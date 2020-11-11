import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, LayoutAnimation } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import { CoreContext } from "./shared/react/CoreContext";
import { numberWithCommas } from "./shared/react/Misc";
import theme from "./Theme";
import { MakeLabel, popularityFilterCategories } from "./shared/react/PopularityFilterCategories";
import { borderRadius } from "polished";
import { ToggleButton } from "./Common";

function SearchPill({ name, clickCallback }) {
  return (
    // <Button buttonStyle={styles.button}
    //   titleStyle={styles.title}
    //   onPress={() => clickCallback(name)}
    //   title={name}
    //   type="solid"
    //   color={theme.colors.secondary}
    // />

    <ToggleButton
      style={styles.button}
      active={true}
      onPress={() => clickCallback(name)}
    >
      <Text style={styles.title}>
        {name}
      </Text>
    </ToggleButton>
  );
}

export default function SearchPills() {
  const {
    searchTags,
    removeSearchTag,
    clearSearchTerm,
    deviceFilter,
    toggleDeviceFilter,
    popularityFilter,
    setPopularityFilter,
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
    pillElems.push(<SearchPill key={pillElems.length} name={e} clickCallback={onTagPillClick} />);
    return null;
  });

  // device pills
  const filter = { ...deviceFilter };
  Object.keys(filter).forEach((i) => {
    if (filter[i]) {
      pillElems.push(
        <SearchPill
          key={pillElems.length}
          name={i}
          clickCallback={() => toggleDeviceFilter(i)}
        />
      );
    }
    return filter[i];
  });

  // popularity filter pill
  function onPopularityPillClick(e) {
    setPopularityFilter(-1, -1)
  }

  if (popularityFilter.max !== -1 || popularityFilter.min !== -1) {
    
    let text = ""
    if (popularityFilter.max === -1) {
      text = "at least " + numberWithCommas(popularityFilter.min)
    }
    else if (popularityFilter.min === -1) {
      text = "up to " + numberWithCommas(popularityFilter.max)
    }
    else {
      text = numberWithCommas(popularityFilter.min) + " to " + numberWithCommas(popularityFilter.max)
    }
    pillElems.push(
      <SearchPill
        key={pillElems.length}
        name={"Popularity " + text}
        clickCallback={onPopularityPillClick}
      />
    );
  }

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
    marginBottom: theme.rem * 0.5,
    marginRight: theme.rem * 0.4,
    borderRadius: theme.borderRadius,
    height: "auto",
  },
  title: {
    fontSize: theme.fonts.sizes.primary,
    color: theme.fonts.colors.title,
    fontWeight: theme.fonts.weights.bold,
  },
});
