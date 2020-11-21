import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Text, View, SafeAreaView, FlatList, StyleSheet, Constants } from "react-native";
import CardItem from "./CardItem";
import SearchCountCard from "./SearchCountCard";
import SearchPills from "./SearchPills";
import Searchbar from "./Searchbar";
import SortBy from "./SortBy";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import { SearchBar } from "react-native-elements";

export default function CardListFlat() {
  const { searchResults, fetchMoreResults, newSearchSubmitted } = useContext(SearchResultsContext);

  function renderItem({ item, index }) {
    
    if (index === 0) {
      return <SearchPills />
    }
    else if (index === 1) {
      return <SearchBar />
    }
    else if (index === 2) {
      return <SortBy />
    }

    return null
    // return <CardItem doc={item}></CardItem>;
  }

  const FETCH_COUNT = 25;

  function onReachedEnd() {
    fetchMoreResults(FETCH_COUNT);
  }

  useEffect(() => {
  }, [newSearchSubmitted]);

  useEffect(() => {
  }, [searchResults]);

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onReachedEnd}
        onEndReachedThreshold={0}
        initialNumToRender={25}
        style={styles.scrollView}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
