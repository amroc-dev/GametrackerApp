import React, { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CardItem from "./CardItem";
import LoadingSpinner from "./LoadingSpinner";
import SearchCountCard from "./SearchCountCard";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";

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
    }

    if (searchResults.resultsCount === 0) {
      setHasMoreItems(false);
    }
  }, [searchResults]);

  function onScroll({ nativeEvent }) {
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);
    if (diff < 1) {
      fetchMoreResults(FETCH_COUNT);
    }
  }

  return (
    <View>
      <ScrollView ref={scrollViewRef} onScroll={onScroll} scrollEventThrottle={100}>
        {searchCountCard}
        {items}
        {isFetchingResults && hasMoreItems ? <LoadingSpinner /> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {},
});
