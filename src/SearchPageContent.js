import React, { useState, useEffect, useLayoutEffect, useContext, useRef, memo } from "react";
import { View, ScrollView, StyleSheet, SafeAreaView, LayoutAnimation, Text } from "react-native";
import CardItem from "./CardItem";
import LoadingSpinner from "./LoadingSpinner";
import SearchCountCard from "./SearchCountCard";
import SearchPills from "./SearchPills";
import Searchbar from "./Searchbar";
import SortBy from "./SortBy";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext, statusCodes } from "./shared/react/SearchResultsContext";
import InfiniteScrollView from "./InfiniteScrollView";
import { ThemeContext } from "./ThemeContext";
import { Transitioning, Transition } from "react-native-reanimated";
import { HeaderSpace, Spacer } from "./Common";

export default memo(function SearchPageContent() {
  const { theme } = useContext(ThemeContext);
  const { searchResults, fetchMoreResults, newSearchSubmitted, isFetchingResults } = useContext(SearchResultsContext);
  const { searchID } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [searchCountCard, setSearchCountCard] = useState();
  const [networkError, setNetworkError] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const FETCH_COUNT = 20;

  useLayoutEffect(() => {
    setSearchCountCard(null);
    setNetworkError(false);
    setItems([]);
  }, [searchID]);

  useLayoutEffect(() => {
    setSearchCountCard(null)
    setNetworkError(false)
    setItems([]);
    setHasMoreItems(true);
    fetchMoreResults(FETCH_COUNT);
  }, [newSearchSubmitted]);

  useEffect(() => {
    // this is just for the condition when search results has been cleared at the start of a new search
    if (searchResults.status === statusCodes.None) {
      setSearchCountCard(null);
      return;
    }

    if (searchResults.status === statusCodes.TimedOut || searchResults.status === statusCodes.Failed) {
      setNetworkError(true)
      return;
    }

    if (items.length === 0) {
      setSearchCountCard(<SearchCountCard key={0} count={searchResults.resultsCount} errorMessage={null} />);
    }

    if (searchResults.resultsCount === 0) {
      setHasMoreItems(false);
      return;
    }

    const slicePoint = items.length;
    const resultsSlice = searchResults.results.slice(slicePoint);

    const newItems = [];
    resultsSlice.map((item) => {
      newItems.push(<CardItem key={item.searchBlob.trackId} doc={item} />);
      return null;
    });

    if (newItems.length > 0) {
      setItems((prev) => prev.concat(newItems));
      setHasMoreItems(searchResults.results.length < searchResults.resultsCount);

      // LayoutAnimation.configureNext({
      //   create: {
      //     duration: 50,
      //     type: LayoutAnimation.Types.easeIn,
      //     property: LayoutAnimation.Properties.opacity,
      //   },
      // });
    } else {
      setHasMoreItems(false);
    }
  }, [searchResults]);

  transitionViewRef = useRef();
  const cardListTransition = (
    <Transition.Together>
      {/* <Transition.In type="fade" durationMs={125} interpolation="easeIn" /> */}
      <Transition.Change interpolation="easeInOut" />
    </Transition.Together>
  );

  useEffect(() => {
    if (searchResults.status === statusCodes.None) {
      transitionViewRef.current.animateNextTransition();
    }

    LayoutAnimation.configureNext({
      create: {
        duration: theme.fadeSpeed,
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  }, [searchResults]);

  const styles = getStyles(theme)

  return (
    <InfiniteScrollView
      hasMoreItems={hasMoreItems}
      isFetchingResults={isFetchingResults}
      fetchMoreResults={() => {
        setNetworkError(false)
        fetchMoreResults(FETCH_COUNT);
      }}
      showNetworkError={networkError}
      style={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic"
      indicatorStyle={theme.isDark ? "white" : "black"}
      keyboardShouldPersistTaps="handled"
    >
      <HeaderSpace />
      <Spacer size={theme.searchPageTopPadding} />
      <SearchPills />
      <Transitioning.View ref={transitionViewRef} transition={cardListTransition}>
        <Searchbar />
        <SortBy />
        <View style={styles.cardList}>
          {searchCountCard}
          {items}
        </View>
      </Transitioning.View>
    </InfiniteScrollView>
  );
});

function getStyles(theme) {
  return StyleSheet.create({
  scrollView: {
    height: "100%",
    paddingHorizontal: theme.rem * 0.5,
  },
  cardList: {

  },
});
}
