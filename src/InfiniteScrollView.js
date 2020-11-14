import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import theme from "./Theme";

export default function InfiniteScrollView(props) {
  const [contentHeight, setContentHeight] = useState(0);

  function onScroll({ nativeEvent }) {
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);

    if (diff < 200) {
      if (nativeEvent.contentSize.height != contentHeight) {
        setContentHeight(nativeEvent.contentSize.height);

        if (props.hasMoreItems) props.fetchMoreResults();
      }
    }
  }

  const defaultLoadingView = props.loadingView ? props.loadingView : <LoadingSpinner />;

  const bottomMargin = <View style={{ margin: 0, marginBottom: theme.rem * 0.5 }} />;
  const loadingView =
    defaultLoadingView && props.hasMoreItems ? (
      <View style={{ marginVertical: theme.rem * 1 }}>{defaultLoadingView}</View>
    ) : null;

  return (
    <ScrollView scrollEventThrottle={16} {...props} onScroll={onScroll}>
      {props.children}
      {loadingView}
    </ScrollView>
  );
}

InfiniteScrollView.propTypes = {
  hasMoreItems: PropTypes.bool.isRequired,
  fetchMoreResults: PropTypes.func.isRequired,
  loadingView: PropTypes.element,
};
