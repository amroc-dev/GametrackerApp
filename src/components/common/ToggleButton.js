import React, { useContext, useRef } from "react";
import { Pressable, Animated } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import { rgba, transparentize, invert, darken, lighten } from "polished";

export function ToggleButton(props) {
  const pressFade = useRef(new Animated.Value(1)).current;
  const { theme } = useContext(ThemeContext);

  const baseStyle = {
    padding: theme.rem * 0.5,
    // height: theme.rowHeight,
    justifyContent: "center",
    backgroundColor: props.backgroundColor ? props.backgroundColor : theme.colors.primary,
  };

  return (
    <Pressable
      onPressIn={() =>
        Animated.timing(pressFade, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }).start()
      }
      onPressOut={() =>
        Animated.timing(pressFade, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start()
      }
      {...props}
      style={[baseStyle, props.style, { backgroundColor: props.active ? baseStyle.backgroundColor : rgba(0, 0, 0, 0) }]}
    >
      <Animated.View style={{ opacity: pressFade }}>{props.children}</Animated.View>
    </Pressable>
  );
}
