import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { numberWithCommas } from "./shared/react/Misc";
import { SearchContext } from "./shared/react/SearchContext";
import { CoreContext } from "./shared/react/CoreContext";
import { ThemeContext } from "./ThemeContext";
import { getFilterStyles, FilterHeader } from "./Filter_styles";
import { lighten, darken, toColorString } from "polished";
import RangeSlider from "@jesster2k10/react-native-range-slider";
import rgbHex from "rgb-hex";

let sliderPressed = false;

function FilterPopularity() {
  const { theme } = useContext(ThemeContext);
  const { popularityIntervals } = useContext(CoreContext);
  const { popularityFilter, setPopularityFilter } = useContext(SearchContext);
  const [sliderValRead, setSliderValRead] = useState({ min: 0, max: 0 });
  const [sliderValWrite, setSliderValWrite] = useState({ min: 0, max: 0 });

  const styles = getStyles(theme)
  const filterStyles = getFilterStyles(theme)

  useEffect(() => {
    sliderPressed = false;
  }, []);

  useEffect(() => {
    function getSliderMax() {
      if (popularityFilter.max === -1) {
        return popularityIntervals.length - 1;
      }

      for (let i = 0; i < popularityIntervals.length; i++) {
        if (popularityIntervals[i] >= popularityFilter.max) {
          return i;
        }
      }

      return 1;
    }

    function getSliderMin() {
      if (popularityFilter.min === -1) {
        return 0;
      }

      for (let i = popularityIntervals.length - 1; i > 0; i--) {
        if (popularityIntervals[i] <= popularityFilter.min) {
          return i;
        }
      }
      return 0;
    }

    setSliderValWrite({ min: getSliderMin(), max: getSliderMax() });
  }, [popularityIntervals, popularityFilter]);

  function onChange(min, max) {
    setSliderValRead({ min: min, max: max });
  }

  function getText() {
    let text = "";
    const sliderMin = sliderValRead.min === -1 ? 0 : sliderValRead.min;
    const sliderMax = sliderValRead.max === -1 ? popularityIntervals.length - 1 : sliderValRead.max;

    if (popularityIntervals.length === 0 || (sliderMin === 0 && sliderMax === popularityIntervals.length - 1)) {
      text = (
        <View style={styles.textContainer}>
          <Text style={styles.textUnits}>All</Text>
        </View>
      );
    } else {
      if (sliderValRead.max === popularityIntervals.length - 1) {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Min </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      } else if (sliderValRead.min === 0) {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Max </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMax])}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      } else {
        text = (
          <View style={styles.textContainer}>
            {/* <Text style={styles.text}>Min </Text> */}
            <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
            <Text style={styles.text}> to </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMax])}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      }
    }

    return text;
  }

  const [hitSlop, setHitSlop] = useState(0);

  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"Popularity"} />
      <View style={[filterStyles.bodyContainer, styles.body]}>
        {getText()}
        <Pressable
          style={styles.sliderContainer}
          hitSlop={hitSlop}
          onPressIn={() => {
            sliderPressed = true;
            setHitSlop(9999);
          }}
          onPressOut={() => {
            sliderPressed = false;
            const minVal = sliderValRead.min === 0 ? -1 : popularityIntervals[sliderValRead.min];
            const maxVal =
              sliderValRead.max === popularityIntervals.length - 1 ? -1 : popularityIntervals[sliderValRead.max];
            setPopularityFilter(minVal, maxVal);
            setHitSlop(0);
          }}
        >
          <RangeSlider
            type="range"
            style={styles.slider}
            min={0}
            max={popularityIntervals.length - 1}
            step={1}
            lineHeight={3}
            hideLabels={true}
            tintColor={theme.colors.secondary}
            tintColorBetweenHandles={rgbHex(theme.colors.primary)}
            handleColor={lighten(0.0, theme.colors.primary)}
            minDistance={popularityIntervals.length / 20}
            selectedMinimum={sliderValWrite.min}
            selectedMaximum={sliderValWrite.max}
            onChange={onChange}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default memo(FilterPopularity);

function getStyles(theme) {
  return StyleSheet.create({
    outer: {},

    body: {
      paddingHorizontal: theme.rem * 0.5,
    },
    sliderContainer: {
      marginTop: theme.rem * -0.75,
    },
    slider: {},
    textContainer: {
      paddingTop: theme.rem * 1,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    text: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.primary,
      fontWeight: theme.fonts.weights.bold,
    },
    textUnits: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.header,
      fontWeight: theme.fonts.weights.bold,
    },
  });
}
