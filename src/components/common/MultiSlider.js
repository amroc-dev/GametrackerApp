import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import { rgba, transparentize, invert, darken, lighten } from "polished";

//////////////////////////////////////////////////////////////////////////////////////////////////////

import _MultiSlider from "@ptomasroos/react-native-multi-slider";

const THUMB_SIZE = 20;

function MultiSliderMarker() {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        width: 48,
        height: 48,
        backgroundColor: "rgba(0,0,0,0.0)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          backgroundColor: theme.colors.primary,
          borderRadius: 30, //THUMB_SIZE / 2 + 1,
          // borderWidth: 0,
          // borderColor: theme.colors.primary,
        }}
      />
    </View>
  );
}

export function MultiSlider(props) {
  const { theme } = useContext(ThemeContext);
  const [parentWidth, setParentWidth] = useState(0);
  const [ready, setReady] = useState(false);

  const parentContainerStyle = props.parentContainerStyle ? props.parentContainerStyle : {};

  useEffect(() => {
    if (parentWidth > 0 && props.max > 0) {
      setReady(true);
    }
  }, [parentWidth, props.max]);

  const readyStyle = { opacity: ready ? 1 : 0 };

  return (
    <View
      style={[parentContainerStyle, readyStyle, { top: props.values.length == 2 ? 15 : 0 }]}
      onLayout={({ nativeEvent }) => setParentWidth(nativeEvent.layout.width)}
    >
      <_MultiSlider
        touchDimensions={{ slipDisplacement: 2000 }}
        customMarker={MultiSliderMarker}
        markerOffsetY={1}
        trackStyle={{
          height: 3,
          backgroundColor: theme.colors.secondary,
        }}
        selectedStyle={{
          height: 32,
          top: -15,
          backgroundColor: theme.colors.primary,
          borderTopWidth: 15,
          borderBottomWidth: 14,
          borderColor: theme.colors.background2,
          borderRadius: 0,
        }}
        {...props}
        sliderLength={parentWidth}
      />
    </View>
  );
}
