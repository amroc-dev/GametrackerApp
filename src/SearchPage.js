import React, {useState, useEffect, useContext, useRef} from 'react';
import {Button, SafeAreaView, View, StyleSheet} from 'react-native';
import CardList from './CardList';
import {SearchContext} from './shared/react/SearchContext';
import theme from './Theme';

export default function SearchPage({navigation}) {
  const {submitSearch} = useContext(SearchContext);

  function onSearchPressed() {
    submitSearch();
  }

  return (
    <SafeAreaView style={styles.root}>
      <Button title="Search" onPress={onSearchPressed} />
      <CardList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background1,
  },
});
