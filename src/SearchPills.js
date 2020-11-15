import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, LayoutAnimation } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import { CoreContext } from "./shared/react/CoreContext";
import { numberWithCommas } from "./shared/react/Misc";
import theme from "./Theme";
import { MakeLabel, popularityFilterCategories } from "./shared/react/PopularityFilterCategories";
import { borderRadius } from "polished";
import { ToggleButton } from "./Common";
import Fade from "react-native-fade";

function SearchPill({ name, clickCallback }) {
  const [visible, setVisible] = useState(false)

  useEffect( () => {
    setVisible(true)
  }, [])
  
  return (
    <Fade visible={visible}>
      <ToggleButton style={styles.button} active={true} onPress={() => clickCallback(name)}>
        <Text style={styles.title}>{name}</Text>
      </ToggleButton>
    </Fade>
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

  const { submittedSearchTerm, newSearchSubmitted } = useContext(SearchResultsContext);

  const [pillElems, setPillElems] = useState([]);

  useEffect(() => {
    let pills = [];

    // search pill
    if (submittedSearchTerm.length > 0) {
      pills.push(
        <SearchPill
          key={pills.length}
          name={submittedSearchTerm}
          // name={"\"" + submittedSearchTerm + "\""}
          clickCallback={() => {
            clearSearchTerm();
          }}
        />
      );
    }

    function onTagPillClick(name) {
      removeSearchTag(name);
    }

    // tags pills
    searchTags.map((e) => {
      pills.push(<SearchPill key={pills.length} name={e} clickCallback={onTagPillClick} />);
      return null;
    });

    // device pills
    const filter = { ...deviceFilter };
    Object.keys(filter).forEach((i) => {
      if (filter[i]) {
        pills.push(<SearchPill key={pills.length} name={i} clickCallback={() => toggleDeviceFilter(i)} />);
      }
      return filter[i];
    });

    // popularity filter pill
    function onPopularityPillClick(e) {
      setPopularityFilter(-1, -1);
    }

    if (popularityFilter.max !== -1 || popularityFilter.min !== -1) {
      let text = "";
      if (popularityFilter.max === -1) {
        text = "Min " + numberWithCommas(popularityFilter.min);
      } else if (popularityFilter.min === -1) {
        text = "Max " + numberWithCommas(popularityFilter.max);
      } else {
        text = numberWithCommas(popularityFilter.min) + " to " + numberWithCommas(popularityFilter.max);
      }
      pills.push(<SearchPill key={pills.length} name={"Popularity " + text} clickCallback={onPopularityPillClick} />);
    }

    setPillElems(pills);
  }, [newSearchSubmitted]);

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
