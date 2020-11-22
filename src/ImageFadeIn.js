import React, { useState } from "react";
import { Animated } from "react-native";

export default function ImageFadeIn(props) {
  const [opacity] = useState(new Animated.Value(0));

  function onLoad() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: props.duration ? props.duration : 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.Image
      onLoad={onLoad}
      {...props}
      style={[
        {
          opacity: opacity,
        },
        props.style,
      ]}
    />
  );
}
