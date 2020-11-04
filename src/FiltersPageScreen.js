import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import FiltersPage from "./FiltersPage";
import { BackButton } from "./NavButtons";

export default function FiltersPageScreen({ navigation }) {
  const { setDeferSearch } = useContext(SearchResultsContext)
  
  useEffect(() => {
    
    navigation.setOptions({
      headerTitle: "Filters",
      headerLeft: () => (
        <BackButton onPress={() => navigation.goBack()} />
      ),
    });

  }, [navigation]);

  useEffect( () => {

    return navigation.addListener('focus', () => {
      setDeferSearch(true)
    });

  }, [navigation])

  useEffect( () => {

    return navigation.addListener('blur', () => {
      setDeferSearch(false)
    });

  }, [navigation])

  return <FiltersPage />;
}
