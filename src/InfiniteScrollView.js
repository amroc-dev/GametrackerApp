import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import theme from "./Theme";

const status_hidden = "hidden";
const status_visible = "visible";

export default function InfiniteScrollView(props) {
  const [contentHeight, setContentHeight] = useState(0);
  const [status, setStatus] = useState(status_hidden);

  function onScroll({ nativeEvent }) {
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);

    if (diff < 200) {
      if (nativeEvent.contentSize.height != contentHeight) {
        setContentHeight(nativeEvent.contentSize.height);

        if (props.hasMoreItems) props.fetchMoreResults();
      }
    }
  }

  useEffect(() => {
    if (props.showLoadingView[0]) {
      if (status === status_hidden) {
        const newId = setTimeout(() => setStatus(status_visible), props.showLoadingView[1]);
        setStatus(newId);
      }
    } else {
      if (status !== status_hidden && status !== status_visible) {
        clearTimeout(status);
      }
      setStatus(status_hidden);
    }
  }, [props.showLoadingView]);

  const loadingView = <View style={{ marginVertical: theme.rem * 1 }}><LoadingSpinner /></View>

  return (
    <ScrollView scrollEventThrottle={16} {...props} onScroll={onScroll}>
      {props.children}
      {status === status_visible ? loadingView : null}
    </ScrollView>
  );
}

InfiniteScrollView.propTypes = {
  hasMoreItems: PropTypes.bool.isRequired,
  fetchMoreResults: PropTypes.func.isRequired,
  showLoadingView: PropTypes.array, // [0] is bool specifying whether to show loading view, [1] is delay in ms before showing
};
