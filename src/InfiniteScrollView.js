import React, { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import { ThemeContext } from "./ThemeContext";
import nextFrame from "next-frame";

const status_hidden = "hidden";
const status_visible = "visible";

export default function InfiniteScrollView(props) {
  const { theme } = useContext(ThemeContext);
  const [contentViewHeight, setContentViewHeight] = useState(0);
  const [okToFetch, setOkToFetch] = useState(true);
  const [status, setStatus] = useState(status_hidden);

  function onScroll({ nativeEvent }) {
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);

    if (diff < 100 && okToFetch && props.hasMoreItems) {
      setOkToFetch(false);
      props.fetchMoreResults();
    }
  }

  useEffect(() => {
    setStatus(props.showLoadingView ? status_visible : status_hidden);
  }, [props.showLoadingView]);

  useEffect(() => {
    async function next() {
      await nextFrame();
      setOkToFetch(true);
    }
    next();
  }, [contentViewHeight]);

  const loadingViewStyle = {
    marginVertical: theme.rem * 1,
    opacity: props.showLoadingView ? 1 : 0,
    display: props.hasMoreItems ? 'flex' : 'none',
  };
  const loadingView = (
    <View style={loadingViewStyle}>
      <LoadingSpinner />
    </View>
  );

  return (
    <ScrollView scrollEventThrottle={16} {...props} onScroll={onScroll}>
      <View onLayout={({ nativeEvent }) => setContentViewHeight(nativeEvent.layout.height)}>{props.children}</View>
      {loadingView}
    </ScrollView>
  );
}

InfiniteScrollView.propTypes = {
  hasMoreItems: PropTypes.bool.isRequired,
  fetchMoreResults: PropTypes.func.isRequired,
  showLoadingView: PropTypes.bool,
};
