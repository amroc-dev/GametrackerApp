import React, { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Flow } from "react-native-animated-spinkit";
import CardItem from "./CardItem";
import SearchCountCard from "./SearchCountCard";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";

export default function CardListScroll() {
  const { searchResults, fetchMoreResults, newSearchSubmitted } = useContext(SearchResultsContext);
  const [items, setItems] = useState([]);
  const [searchCountCard, setSearchCountCard] = useState();
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const FETCH_COUNT = 20;

  useEffect(() => {
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

    if (Object.keys(searchResults).length === 0) {
      return;
    }

    if (items.length === 0) {
      setSearchCountCard(
        <SearchCountCard
          key={0}
          count={searchResults.resultsCount}
          errorMessage={null}
        />
      );
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
    }
  }, [searchResults]);

  function onScroll({ nativeEvent }) {
    // console.log('ContentSize: ' + JSON.stringify(nativeEvent.contentSize));
    // console.log('ContentInset: ' + JSON.stringify(nativeEvent.contentInset));
    // console.log('ContentOffset: ' + JSON.stringify(nativeEvent.contentOffset));
    // console.log('layoutMeasurement: ' + JSON.stringify(nativeEvent.layoutMeasurement));
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);
    if (diff < 0) {
      fetchMoreResults(FETCH_COUNT);
    }
  }

  return (
    <View>
      <ScrollView onScroll={onScroll} scrollEventThrottle={100}>
        {searchCountCard}
        {items}
        {/* <Flow size={48} color="#FFF" /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    // backgroundColor: 'pink',
    // marginHorizontal: 20,
  },
  text: {
    // fontSize: 42,
  },
});
