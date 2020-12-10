import React, { useContext, useState, useRef, useEffect } from "react";
import { rgba, readableColor, transparentize } from "polished";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Animated, Pressable } from "react-native";
import { ThemeContext } from "@root/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import { shallowEqualObjects } from "shallow-equal";
import { Separator } from "@components/common/Misc";

export function OptionButton({ children, checked, edgePosition, onPressed, id }) {
  const pressFade = useRef(new Animated.Value(0)).current;
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  const col = pressFade.interpolate({
    inputRange: [0, 1],
    outputRange: [transparentize(1, theme.colors.secondary), theme.colors.secondary],
  });

  let rowPositionStyle = { borderRadius: 0 };

  if (edgePosition === "top") {
    rowPositionStyle = {
      borderRadius: 0,
      borderTopLeftRadius: theme.borderRadius,
      borderTopRightRadius: theme.borderRadius,
    };
  } else if (edgePosition === "bottom") {
    rowPositionStyle = {
      borderRadius: 0,
      borderBottomLeftRadius: theme.borderRadius,
      borderBottomRightRadius: theme.borderRadius,
    };
  }

  return (
    <Pressable
      onPressIn={() =>
        Animated.timing(pressFade, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }).start()
      }
      onPressOut={() => {
        Animated.timing(pressFade, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }}
      onPress={() => {
        onPressed ? onPressed(id) : null;
      }}
      style={[styles.optionRow]}
    >
      <Animated.View style={[styles.optionRow, rowPositionStyle, { backgroundColor: col }]}>
        <View style={styles.optionRowContent}>{children}</View>
      </Animated.View>
    </Pressable>
  );
}

export default function OptionList({ options, multiSelect, onStateChanged }) {
  const { theme } = useContext(ThemeContext);

  const [selectionState, setSelectionState] = useState(options);
  const [userChangedState, setUserChangedState] = useState(false);

  const styles = getStyles(theme);

  function onOptionButtonPressed(id) {
    setUserChangedState(true);

    if (multiSelect) {
      setSelectionState((prev) => {
        let newState = { ...prev };
        newState[id] = !newState[id];
        return newState;
      });
    } else {
      setSelectionState((prev) => {
        let newState = { ...prev };
        Object.keys(newState).forEach((key) => (newState[key] = false));
        newState[id] = !newState[id];
        return newState;
      });
    }
  }

  useEffect(() => {
    if (onStateChanged && userChangedState) onStateChanged(selectionState);
    setUserChangedState(false);
  }, [selectionState]);

  useEffect(() => {
    if (!shallowEqualObjects(options, selectionState)) setSelectionState(options);
  }, [options]);

  const stateKeys = Object.keys(selectionState);
  const optionsElems = stateKeys.map((key, index) => {
    return (
      <View key={index}>
        <OptionButton
          edgePosition={index === 0 ? "top" : index === stateKeys.length - 1 ? "bottom" : ""}
          id={key}
          onPressed={onOptionButtonPressed}
        >
          <Text style={styles.text}>{key}</Text>
          {selectionState[key] ? (
            <Icon
              style={[styles.text, { fontSize: 24, color: theme.colors.primary }]}
              name="ios-checkmark-sharp"
              color={theme.colors.primary}
            />
          ) : null}
        </OptionButton>
        {index < stateKeys.length - 1 ? (
          <Separator style={{ marginHorizontal: theme.rem * 0.0, marginVertical: -StyleSheet.hairlineWidth }} />
        ) : null}
      </View>
    );
  });

  return <View>{optionsElems}</View>;
}

function getStyles(theme) {
  return StyleSheet.create({
    container: {},
    optionRow: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      height: theme.rowHeight,
      borderRadius: theme.borderRadius,
    },
    optionRowContent: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: theme.rem * 0.75,
      opacity: 1,
    },
    text: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      alignSelf: "center",
    },
  });
}
