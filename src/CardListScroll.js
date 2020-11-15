import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from "react";
import { View, ScrollView, StyleSheet, SafeAreaView, LayoutAnimation } from "react-native";
import CardItem from "./CardItem";
import LoadingSpinner from "./LoadingSpinner";
import SearchCountCard from "./SearchCountCard";
import SearchPills from "./SearchPills";
import Searchbar from "./Searchbar";
import SortBy from "./SortBy";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import InfiniteScrollView from "./InfiniteScrollView";
import theme from "./Theme";
import { Transitioning, Transition } from "react-native-reanimated";

export default function CardListScroll() {
  const { searchResults, fetchMoreResults, newSearchSubmitted, isFetchingResults } = useContext(SearchResultsContext);
  const [items, setItems] = useState([]);
  const [searchCountCard, setSearchCountCard] = useState();
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const FETCH_COUNT = 20;

  useLayoutEffect(() => {
    setSearchCountCard(null);
    setItems([]);
    setHasMoreItems(true);
    fetchMoreResults(FETCH_COUNT);
  }, [newSearchSubmitted]);

  useEffect(() => {
    if (searchResults === null) {
      setHasMoreItems(false);
      setSearchCountCard(<SearchCountCard key={0} count={0} errorMessage={"Cannot reach server"} />);
      return;
    }
    
    // this is just for the condition when search results has been cleared at the start of a new search
    if (Object.keys(searchResults).length === 0) {
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
      <Transition.In type="fade" durationMs={125} interpolation="easeIn" />
      {/* <Transition.Out type="fade" durationMs={62} interpolation="easeOut" /> */}
      <Transition.Change interpolation="easeInOut" />
    </Transition.Together>
  );

  useLayoutEffect(() => {
    transitionViewRef.current.animateNextTransition();
  });

  return (
    <InfiniteScrollView
      hasMoreItems={hasMoreItems}
      showLoadingView={[isFetchingResults, items.length === 0 ? 125 : 0]}
      fetchMoreResults={() => {
        fetchMoreResults(FETCH_COUNT);
      }}
      style={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic"
      indicatorStyle="white"
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView>
        <SearchPills />
        <Transitioning.View ref={transitionViewRef} transition={cardListTransition}>
          <Searchbar />
          <SortBy />
          <View style={{ marginBottom: theme.rem * 0.5 }}>
            {searchCountCard}
            {items}
          </View >
        </Transitioning.View>
      </SafeAreaView>
    </InfiniteScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
});
