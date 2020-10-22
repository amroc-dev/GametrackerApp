import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Constants,
} from 'react-native';

import {SearchContext} from './shared/react/SearchContext';
import {SearchResultsContext} from './shared/react/SearchResultsContext';

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
  const {searchResults, fetchMoreResults} = useContext(SearchResultsContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('Init');
    fetchMoreResults();
  }, []);

  const itemsRef = useRef();
  itemsRef.current = items;

  useEffect(() => {
    if (searchResults === null) {
      return;
    }

    if (Object.keys(searchResults).length === 0) {
      return;
    }

    const slicePoint = itemsRef.current.length;
    const resultsSlice = searchResults.results.slice(slicePoint);
    const newItems = [];
    resultsSlice.map((item) => {
      // newItems.push(<div className="cardItemSeparator" />);
      newItems.push(<Text>{item.searchBlob.trackName}</Text>)
      //   newItems.push(<CardItem key={item.searchBlob.trackId} doc={item} />);
      return null;
    });

    if (newItems.length > 0) {
      setItems((prev) => prev.concat(newItems));
    }
  }, [searchResults]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{items}</ScrollView>
    </SafeAreaView>
  );
}
