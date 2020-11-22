import React, { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView, Text } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import { ThemeContext } from "./ThemeContext";
import nextFrame from "next-frame";
import { Dimensions } from "react-native";

const status_hidden = "hidden";
const status_visible = "visible";

export default function InfiniteScrollView(props) {
  const { theme } = useContext(ThemeContext);
  const [contentViewHeight, setContentViewHeight] = useState(0);
  const [okToFetch, setOkToFetch] = useState(true);
  const [networkErrorTime, setNetworkErrorTime] = useState(-1);
  const [status, setStatus] = useState(status_hidden);

  function onScroll({ nativeEvent }) {
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);

    const windowHeight = Dimensions.get("window").height;
    const triggerZone = windowHeight / 2;

    if (networkErrorTime !== -1) {
      const elapsed = (new Date).getTime() - networkErrorTime;
      if (elapsed > 1000) {
        setNetworkErrorTime(-1)
        setOkToFetch(true)
      }
    }

    if (diff < triggerZone && okToFetch && props.hasMoreItems && networkErrorTime === -1) {
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
    marginVertical: theme.rem * 0.5,
    opacity: props.isFetchingResults ? 1 : 0,
    display: props.hasMoreItems ? "flex" : "none",
  };
  const loadingView = (
    <View style={loadingViewStyle}>
      <LoadingSpinner />
    </View>
  );

  const networkErrorStyle = {
    alignSelf: "center",
    margin: theme.rem,
    marginTop: theme.rem * 2.5,
    color: theme.fonts.colors.primary,
    fontSize: theme.fonts.sizes.primary,
  };
  const networkError = <Text style={networkErrorStyle}>Unable to connect</Text>;

  const statusView = networkErrorTime !== -1 ? networkError : loadingView;

  useEffect(() => {
    if (props.showNetworkError) {
      setOkToFetch(false);
      setNetworkErrorTime((new Date).getTime())
    }
  }, [props.showNetworkError]);

  return (
    <ScrollView scrollEventThrottle={100} {...props} onScroll={onScroll}>
      <View onLayout={({ nativeEvent }) => setContentViewHeight(nativeEvent.layout.height)}>
        {props.children}
        {statusView}
      </View>
    </ScrollView>
  );
}

InfiniteScrollView.propTypes = {
  hasMoreItems: PropTypes.bool.isRequired,
  fetchMoreResults: PropTypes.func.isRequired,
  isFetchingResults: PropTypes.bool.isRequired,
  showNetworkError: PropTypes.bool,
};
