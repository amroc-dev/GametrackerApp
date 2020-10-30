import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import theme from "./Theme";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import FadeInOut from "./FadeInOut";
import { lighten, darken } from "polished";

export default function ModalDropdown(props) {
  const [overlay, setOverlay] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const isFocused = useIsFocused();
  let controller;

  function onOpen() {
    setFadeIn(true);

    const HACKY_SIZE = 10000;
    setOverlay(
      <Pressable
        onPress={() => controller.close()}
        style={{
          position: "absolute",
          top: -HACKY_SIZE,
          left: -HACKY_SIZE,
          width: HACKY_SIZE * 2,
          height: HACKY_SIZE * 2,
          backgroundColor: "rgba(0,0,0,0.0)",
        }}
      />
    );
  }

  function onClose() {
    setFadeIn(false);
  }

  function onFadeComplete() {
    if (!controller.isOpen()) {
      setOverlay(null);
    }
  }

  useEffect(() => {
    if (!isFocused) {
      controller.close();
    }
  }, [isFocused]);

  return (
    <>
      <FadeInOut visible={fadeIn} onFadeComplete={onFadeComplete} duration={1}>
        {overlay}
      </FadeInOut>
      <DropDownPicker
        controller={(instance) => (controller = instance)}
        style={styles.dropdownStyle}
        containerStyle={styles.dropdownContainer}
        dropDownStyle={styles.dropdown}
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholder}
        onOpen={onOpen}
        onClose={onClose}
        arrowColor="white"
        arrowSize={20}
        dropDownMaxHeight={500}
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 0,
    flex: 1,
    flexDirection: "row",
  },
  dropdownStyle: {
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
  },
  dropdown: {
    flex: 1,
    borderColor: theme.colors.background1,
    borderTopWidth: 2,
    backgroundColor: theme.colors.primary,
    // borderTopLeftRadius: theme.borderRadius,
    // borderTopRightRadius: theme.borderRadius,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    borderWidth: 0,
    // borderTopColor: "rgba(255,255,255,0.5)",
    // borderTopWidth: 1,
    shadowColor: theme.shadowColor,
    shadowOpacity: theme.shadowOpacity,
    shadowRadius: theme.shadowRadius,
    shadowOffset: theme.shadowOffset,
    shadowOffset: {
      width: 0,
      height: theme.shadowRadius,
    },
  },
  itemStyle: {
    justifyContent: "flex-start",
    flex: 1,
  },
  labelStyle: {
    color: "white",
    flex: 1,
    fontSize: theme.fonts.sizes.primary,
    fontWeight: theme.fonts.weights.bold,
    marginLeft: theme.rem * 0.75,
  },
  selectedLabelStyle: {},
});
