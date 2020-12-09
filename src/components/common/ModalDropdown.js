import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet, Pressable, ToolbarAndroidBase } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { lighten, darken } from "polished";
import { Transitioning, Transition } from "react-native-reanimated";
import nextFrame from "next-frame";


export default function ModalDropdown(props) {
  const { theme } = useContext(ThemeContext);
  const [overlay, setOverlay] = useState(null);
  const isFocused = useIsFocused();
  let controller;

  function onOpen() {

    modalTransitioningView.current.animateNextTransition();

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
    async function onCloseNext() {
      await nextFrame();
      if (modalTransitioningView.current)
        setOverlay(undefined);
    }
    onCloseNext() 
  }

  useEffect(() => {
    if (!isFocused) {
      controller.close();
    }
  }, [isFocused]);

  const styles = getStyles(theme);

  modalTransitioningView = useRef();
  const modalTransition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={200} interpolation="linear"/>
    </Transition.Together>
  );

  // const selectedLabelStyle = controller && controller.isOpen ? {} : styles.selectedLabelStyle

  return (
    <Transitioning.View style={{flexDirection: 'row'}} ref={modalTransitioningView} transition={modalTransition}>
      {overlay}
      <DropDownPicker
        controller={(instance) => (controller = instance)}
        style={styles.dropdownStyle}
        containerStyle={styles.dropdownContainer}
        dropDownStyle={styles.dropdown}
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        activeLabelStyle={styles.activeLabelStyle}
        selectedLabelStyle={styles.selectedLabelStyle}
        placeholderStyle={styles.placeholder}
        onOpen={onOpen}
        onClose={onClose}
        arrowColor={theme.fonts.colors.primary}
        arrowSize={20}
        dropDownMaxHeight={500}
        {...props}
      />
    </Transitioning.View>

  );
}

function getStyles(theme) {
  
  const backgroundColor = theme.colors.background2;
  
  return StyleSheet.create({
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
      backgroundColor: backgroundColor,
      borderWidth: 0,
    },
    dropdown: {
      flex: 1,
      borderTopWidth: 0,
      backgroundColor: backgroundColor,
      // borderTopLeftRadius: theme.borderRadius,
      // borderTopRightRadius: theme.borderRadius,
      borderBottomLeftRadius: theme.borderRadius,
      borderBottomRightRadius: theme.borderRadius,
      borderWidth: 0,
      // borderTopColor: "rgba(255,255,255,0.5)",
      // borderTopWidth: 1,
      // marginTop: theme.rem * 0.3,
      shadowColor: theme.shadowColor,
      shadowOpacity: theme.isLight ? theme.shadowOpacity_dropdown * 0.7 : theme.shadowOpacity_dropdown,
      shadowRadius: 5,
      shadowOffset: theme.shadowOffset,
      shadowOffset: {
        width: 0,
        height: 10,
      },
    },
    itemStyle: {
      justifyContent: "flex-start",
      flex: 1,
    },
    labelStyle: {
      color: theme.fonts.colors.secondary,
      flex: 1,
      fontSize: theme.fonts.sizes.primary2,
      fontWeight: theme.fonts.weights.bold,
      marginLeft: theme.rem * 0.75,
    },
    activeLabelStyle: {
      color: theme.fonts.colors.primary,
    },
    selectedLabelStyle: {
      color: theme.fonts.colors.primary,
      fontSize: theme.fonts.sizes.primary,
    }
  });
}
