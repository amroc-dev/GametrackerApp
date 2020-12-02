import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, LayoutAnimation } from "react-native";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import { CoreContext } from "./shared/react/CoreContext";
import { numberWithCommas } from "./shared/react/Misc";
import { ThemeContext } from "./ThemeContext";
import { MakeLabel, popularityFilterCategories } from "./shared/react/PopularityFilterCategories";
import { borderRadius } from "polished";
import { ToggleButton } from "./Common";
import { getFilterStyles } from "./Filter_styles";
import Fade from "react-native-fade";
import nextFrame from "next-frame";
import {MIN_VAL as RATING_MIN_VAL, MAX_VAL as RATING_MAX_VAL} from "./FilterRating";

// import { getPopularityScoreFromIndex} from "./FilterPopularity";

function SearchPill({ name, clickCallback }) {
  const { theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const filtersStyles = getFilterStyles(theme)

  const styles = StyleSheet.create({
    button: {
      marginBottom: theme.rem * 0.5,
      marginRight: theme.rem * 0.4,
      borderRadius: theme.pillBorderRadius,
      minWidth: 60,
      alignItems: "center",
      height: "auto",
      paddingHorizontal: theme.pillHorizontalPadding,
      paddingVertical: theme.pillVerticalPadding,
    },
    title: {
      fontSize: theme.fonts.sizes.primary,
      color: theme.fonts.colors.title,
      fontWeight: theme.fonts.weights.bold,
    },
  });

  return (
    // <Fade visible={visible}>
      <ToggleButton style={styles.button} active={true} onPress={() => clickCallback(name)}>
        <Text style={[styles.title, filtersStyles.filterTextSelected]}>{name}</Text>
      </ToggleButton>
    // </Fade>
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
    ratingFilter,
    setRatingFilter,
    searchID,
  } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "rgba(0,0,0,0)",
    },
  });

  const { submittedSearchTerm, newSearchSubmitted } = useContext(SearchResultsContext);
  const {popularityIntervals} = useContext(CoreContext)

  const [pillElems, setPillElems] = useState([]);

  useLayoutEffect(() => {
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
    function onPopularityPillClick() {
      setPopularityFilter(-1, 0, true);
    }
    if (popularityFilter.ratingCount > -1) {
      const ranking = numberWithCommas(popularityIntervals[popularityFilter.index])
      const text = (popularityFilter.ascending ? "> " : "< ") + ranking
      pills.push(<SearchPill key={pills.length} name={"Popularity " + text} clickCallback={onPopularityPillClick} />);
    }

    // rating filter pill
    function onRatingPillClick() {
      setRatingFilter(-1);
    }
    if (ratingFilter != -1) {
      let text = ""

      if (ratingFilter < RATING_MAX_VAL) {
        text = "> " + ratingFilter + " ★"
      } else {
        text = ratingFilter + " ★"
      }
      
      pills.push(<SearchPill key={pills.length} name={"User rating " + text} clickCallback={onRatingPillClick} />);
    }

    setPillElems(pills);

  }, [newSearchSubmitted, searchID]);

  return <View style={styles.container}>{pillElems}</View>;
}
