import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Constants,
} from 'react-native';
import {
  SearchContext,
  SearchContextProvider,
} from './shared/react/SearchContext';
import {SearchResultsContext} from './shared/react/SearchResultsContext';
import {v4 as uuidv4} from 'uuid';

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
  const {searchResults, fetchMoreResults, newSearchStarted} = useContext(SearchResultsContext);
  const [results, setResults] = useState([])

  function renderItem({item, index}) {
    return (
      <Text>{item.searchBlob.trackName}</Text>
    );
  }

  const FETCH_COUNT = 25;

  function onReachedEnd() {
    fetchMoreResults(FETCH_COUNT);
  }

  useEffect( () => {
    setResults([])
    fetchMoreResults(FETCH_COUNT);
  }, [newSearchStarted])

  useEffect( () => {
    if (searchResults && searchResults.results)
      setResults([...searchResults.results])
    else
      setResults([])
  }, [searchResults])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onReachedEnd}
        onEndReachedThreshold={0}
        initialNumToRender={25}
        style={styles.scrollView}></FlatList>
    </SafeAreaView>
  );
}
