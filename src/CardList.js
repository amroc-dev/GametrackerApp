import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Constants,
} from 'react-native';
import {SearchContext} from './shared/react/SearchContext';
import {SearchResultsContext} from './shared/react/SearchResultsContext';
import { v4 as uuidv4 } from "uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default function CardList() {
  const {searchID} = useContext(SearchContext);
  const {searchResults, fetchMoreResults} = useContext(SearchResultsContext);

  const FETCH_COUNT = 25;

  function renderItem({item, index}) {
    return (
      <Text key={index}>{item.searchBlob.trackName}</Text>
    );
  }

  function onReachedEnd() {
    fetchMoreResults(FETCH_COUNT);
  }

  useEffect(() => {
    fetchMoreResults(FETCH_COUNT);
  }, [searchResults]);

  // const listData = searchResults.results || [];

  // console.log("Render")

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={searchResults.results}
        renderItem={renderItem}
        onEndReached={onReachedEnd}
        onEndReachedThreshold={0}
        initialNumToRender={FETCH_COUNT}
        style={styles.scrollView}></FlatList>
    </SafeAreaView>
  );
}
