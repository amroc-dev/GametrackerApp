import React, { useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import FiltersPage from "./FiltersPage";
import { BackButton } from "./NavButtons";

export default function FiltersPageScreen({ navigation }) {
  const { setHoldSearch } = useContext(SearchResultsContext)
  
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
      setHoldSearch(true)
    });

  }, [navigation])

  useLayoutEffect( () => {

    return navigation.addListener('blur', () => {
      setHoldSearch(false)
    });

  }, [navigation])

  return <FiltersPage />;
}
