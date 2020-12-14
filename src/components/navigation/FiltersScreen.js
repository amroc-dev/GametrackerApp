import React, { useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { SearchResultsContext } from "@shared/react/SearchResultsContext";
import FiltersPage from "@components/FiltersPage";
import { BackButton } from "./NavigationCommon";

export default function FiltersScreen({ navigation }) {
  const { setHoldSearch } = useContext(SearchResultsContext)
  
  useEffect(() => {
    
    navigation.setOptions({
      headerTitle: "Filters",
      gestureEnabled: false,
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
