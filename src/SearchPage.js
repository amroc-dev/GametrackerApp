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
    <View style={styles.root}>
      <Button title="Search" onPress={onSearchPressed} />
      <CardList />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background1,
    marginHorizontal: theme.rem * 0.5,
  },
});
