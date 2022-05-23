import React, { useState } from "react";
import { Animated } from "react-native";
import FastImage from 'react-native-fast-image'

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

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
    <AnimatedFastImage
      onLoad={onLoad}
      resizeMode={FastImage.resizeMode.cover}
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
