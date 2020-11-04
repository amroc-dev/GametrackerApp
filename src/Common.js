import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Button, LayoutAnimation, Pressable, Animated } from "react-native";
// import { Button } from "react-native-elements";
import theme from "./Theme";
import { rgba } from "polished";
import Icon from "react-native-vector-icons/Ionicons";

const iconSize = 22;

export function SearchInput(props) {
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showClearButton, setShowClearButton] = useState(true);
  const textInputRef = useRef(null);

  function onTextFocus() {
    Animate();
    setShowCancelButton(true);
  }

  function onEndEditing() {
    Animate();
    setShowCancelButton(false);
  }

  function Animate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => setShowClearButton(true));
    setShowClearButton(false);
  }

  const cancelButton = showCancelButton ? <Button title="Cancel" type="clear" color="white" /> : null;

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.searchInput}>
        <Icon style={styles.icon} name="search" size={iconSize} />
        <TextInput
          clearButtonMode={showClearButton ? "always" : "never"}
          ref={textInputRef}
          {...props}
          style={styles.textInput}
          onFocus={props.useCancelButton ? onTextFocus : null}
          onEndEditing={props.useCancelButton ? onEndEditing : null}
          autoCompleteType='off'
          autoCorrect={false}
        />
      </View>
      {cancelButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: theme.rowHeight,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: theme.borderRadius,
    paddingHorizontal: theme.rem * 0.5,
  },
  textInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 0,
    borderTopRightRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    fontSize: theme.fonts.sizes.header,
    paddingHorizontal: theme.rem * 0.5,
  },
  icon: {
    height: iconSize,
    color: theme.fonts.colors.secondary,
  },
});

export function ToggleButton(props) {
  const pressFade = useRef(new Animated.Value(1)).current;

  const baseStyle = {
    padding: theme.rem * 0.5,
    // height: theme.rowHeight,
    justifyContent: 'center',
    backgroundColor: props.style.backgroundColor ? props.style.backgroundColor : theme.colors.primary,
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
      style={[
        baseStyle,
        props.style,
        { backgroundColor: props.active ? baseStyle.backgroundColor : rgba(0, 0, 0, 0) },
      ]}
    >
      <Animated.View style={{ opacity: pressFade }}>{props.children}</Animated.View>
    </Pressable>
  );
}
