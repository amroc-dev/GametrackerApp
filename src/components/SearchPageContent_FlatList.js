import React, { useState, useEffect, useLayoutEffect, useContext, useRef, memo } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, LayoutAnimation, Text } from "react-native";
import CardItem from "@components/CardItem";
import CardItem2 from "@components/CardItem2";
import LoadingSpinner from "@components/common/LoadingSpinner";
import SearchCountCard from "@components/SearchCountCard";
import SearchPills from "@components/SearchPills";
import Searchbar from "@components/Searchbar";
import SortBy from "@components/SortBy";
import { SearchContext } from "@shared/react/SearchContext";
import { SearchResultsContext, statusCodes } from "@shared/react/SearchResultsContext";
import { ThemeContext } from "@root/ThemeContext";
import { Transitioning, Transition } from "react-native-reanimated";
import { HeaderSpace, Spacer, ControlledLayoutAnimation } from "@components/common/Misc";
import getCardItemStyles from "@styles/CardItem_styles";
import nextFrame from "next-frame";
import { NetworkContext } from "../shared/react/NetworkContext";

export default function SearchPageContent_FlatList({ scrollViewStyle }) {
  const { theme } = useContext(ThemeContext);
  const { searchResults, fetchMoreResults, newSearchSubmitted, isFetchingResults } = useContext(SearchResultsContext);
  const { searchID, isSortingByRecentlyUpdated } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [searchCountCard, setSearchCountCard] = useState();
  const [networkError, setNetworkError] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(null);
  const { connected } = useContext(NetworkContext);

  const FETCH_COUNT = 20;

  const flatListRef = useRef();
  const styles = getStyles(theme);
  const cardItemStyles = getCardItemStyles(theme);
  const itemHeight = cardItemStyles.cardHeight + cardItemStyles.cardSpacing;

  transitionViewRef = useRef();
  const headerChangeTransition = <Transition.Change interpolation="easeInOut" />;

  const listHeaderComponent = (
    <View>
      <HeaderSpace />
      <Spacer size={theme.searchPageTopPadding} />
      <SearchPills />
      <Transitioning.View ref={transitionViewRef} transition={headerChangeTransition}>
        <Searchbar />
        <SortBy />
        {searchCountCard}
      </Transitioning.View>
    </View>
  );

  useEffect(() => {
    if (networkError) {
      setLoadingSpinner(<LoadingSpinner type="networkError" />);
    } else if (hasMoreItems) {
      setLoadingSpinner(<LoadingSpinner type="loading" />);
    } else setLoadingSpinner(<View style={{ marginBottom: cardItemStyles.cardSpacing }} />);
  }, [networkError, hasMoreItems]);

  function renderItem({ item, index }) {
    if (React.isValidElement(item)) return item;
  }

  useLayoutEffect(() => {
    setSearchCountCard(null);
    setNetworkError(false);
    setItems([]);
  }, [searchID]);

  useLayoutEffect(() => {
    setSearchCountCard(null);
    setNetworkError(false);
    setItems([]);
    setHasMoreItems(true);
    fetchMoreResults(FETCH_COUNT);
  }, [newSearchSubmitted]);

  useEffect(() => {
    // this is just for the condition when search results has been cleared at the start of a new search
    if (searchResults.status === statusCodes.None) {
      setSearchCountCard(null);
      return;
    }

    if (searchResults.status === statusCodes.TimedOut || searchResults.status === statusCodes.Failed) {
      setNetworkError(new Date().getTime());
      setHasMoreItems(false);
      return;
    }

    if (items.length === 0) {
      setSearchCountCard(<SearchCountCard key={0} count={searchResults.resultsCount} errorMessage={null} />);
    }

    if (searchResults.resultsCount === 0) {
      setHasMoreItems(false);
      return;
    }

    const slicePoint = items.length;
    const resultsSlice = searchResults.results.slice(slicePoint);

    const sortingByRecentlyUpdated = isSortingByRecentlyUpdated();

    const newItems = [];
    resultsSlice.map((item) => {
      newItems.push(
        <CardItem key={item.searchBlob.trackId} doc={item} showRecentReleaseDate={sortingByRecentlyUpdated} />
      );
      return null;
    });

    if (newItems.length > 0) {
      setItems((prev) => prev.concat(newItems));
      setHasMoreItems(searchResults.results.length < searchResults.resultsCount);
    } else {
      setHasMoreItems(false);
    }
  }, [searchResults]);

  function onEndReached() {
    if (hasMoreItems) fetchMoreResults(FETCH_COUNT);
  }

  useEffect(() => {
    if (searchResults.status === statusCodes.None && transitionViewRef.current) {
      transitionViewRef.current.animateNextTransition();
    }
  }, [searchResults]);

  function onScroll(wait = true) {
    if (networkError) {
      const elapsed = new Date().getTime() - networkError;
      if (elapsed > 1000 || !wait) {
        setNetworkError(false);
        setHasMoreItems(true);
        fetchMoreResults(FETCH_COUNT);
      }
    }
  }

  useEffect(() => {
    onScroll(false)
  }, [connected]);

  return (
    <FlatList
      ref={flatListRef}
      onScroll={onScroll}
      scrollEventThrottle={500}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      initialNumToRender={FETCH_COUNT}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.75}
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={loadingSpinner}
      windowSize={80}
      maxToRenderPerBatch={FETCH_COUNT}
      scrollIndicatorInsets={{ top: 44, left: -1, bottom: 0, right: -StyleSheet.hairlineWidth }}
      updateCellsBatchingPeriod={1}
      style={[styles.scrollView, scrollViewStyle]}
      indicatorStyle={theme.isDark ? "white" : "black"}
      keyboardDismissMode="on-drag"
      getItemLayout={(data, index) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      })}
    />
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    scrollView: {
      height: "100%",
      paddingHorizontal: theme.pageHorizontalPadding,
    },
    contentRoot: {},
    cardList: {},
  });
}
