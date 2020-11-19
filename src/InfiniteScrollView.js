import React, { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import { ThemeContext } from "./ThemeContext";


const status_hidden = "hidden";
const status_visible = "visible";

export default function InfiniteScrollView(props) {
  const {theme} = useContext(ThemeContext);
  const [contentHeight, setContentHeight] = useState(0);
  const [status, setStatus] = useState(status_hidden);

  function onScroll({ nativeEvent }) {
    const diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height);

    if (diff < 1) {
      if (nativeEvent.contentSize.height != contentHeight) {
        setContentHeight(nativeEvent.contentSize.height);

        if (props.hasMoreItems) props.fetchMoreResults();
      }
    }
  }

  useEffect(() => {
    // if (status !== status_hidden && status !== status_visible) {
    //   clearTimeout(status);
    // }
    // if (props.showLoadingView[0]) {
    //     const newId = setTimeout(() => setStatus(status_visible), props.showLoadingView[1]);
    //     setStatus(newId);
    // } else {
    //   setStatus(status_hidden);
    // }

    // if (props.showLoadingView[0]) setStatus(status_visible)
    // else setStatus(status_hidden)

    // console.log(props.showLoadingView[0])
    setStatus(props.showLoadingView ? status_visible : status_hidden)


    // if (props.showLoadingView) setStatus(status_visible)
    // else if (status === status_visible && !props.showLoadingView) {
    //   setTimeout(() => {
    //     setStatus(status_hidden)
    //   }, 1000);
    // }

  }, [props.showLoadingView]);

  const loadingViewStyle = {
    marginVertical: theme.rem * 1,
    display: props.showLoadingView ? 'flex' : 'none'
  }
  const loadingView = <View style={loadingViewStyle}><LoadingSpinner /></View>

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
  showLoadingView: PropTypes.bool
};
