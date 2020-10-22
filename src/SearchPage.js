import React, {useState, useEffect, useContext, useRef} from 'react';
import {Button, Text} from 'react-native';
import CardList from './CardList';
import { SearchContext } from "./shared/react/SearchContext";

export default function SearchPage({navigation}) {
  const { submitSearch } = useContext(SearchContext)

  function onSearchPressed() {
    submitSearch()
  }
  
  return (
    <>
      <Button title="Search" onPress={onSearchPressed} />
      <CardList></CardList>
    </>
  );
}
