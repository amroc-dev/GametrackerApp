import React, { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import CardItem from "./CardItem";
import LoadingSpinner from "./LoadingSpinner";
import SearchCountCard from "./SearchCountCard";
import Searchbar from "./Searchbar";
import SortBy from "./SortBy";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";

export default function CardListScroll() {
  const { searchResults, fetchMoreResults, newSearchSubmitted, isFetchingResults } = useContext(SearchResultsContext);
  const [items, setItems] = useState([]);
  const [searchCountCard, setSearchCountCard] = useState();
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const scrollViewRef = useRef(null);

  const FETCH_COUNT = 20;

  useEffect(() => {
    setSearchCountCard(null);
    setItems([]);
    setHasMoreItems(true);
    fetchMoreResults(FETCH_COUNT);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [newSearchSubmitted]);

  useEffect(() => {
    if (searchResults === null) {
      setHasMoreItems(false);
      setSearchCountCard(<SearchCountCard key={0} count={0} errorMessage={"Cannot reach server"} />);
      return;
    }

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
    } else {
      setHasMoreItems(false);
    }

  }, [searchResults]);

  function onScroll({ nativeEvent }) {
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);
    if (diff < 50) {
      fetchMoreResults(FETCH_COUNT);
    }
  }

  const bottomMargin = <View style={{ margin: 0, marginBottom: theme.rem * 0.5 }} />;

  return (
    <ScrollView
      style={styles.scrollView}
      ref={scrollViewRef}
      onScroll={onScroll}
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={100}
    >
      <SafeAreaView>
        <Searchbar />
        <SortBy />
        {searchCountCard}
        {items}
        {isFetchingResults && hasMoreItems ? <LoadingSpinner /> : null}
        {bottomMargin}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
});
