import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from "react-native";
import { numberWithCommas } from "./shared/react/Misc";
import { SearchContext } from "./shared/react/SearchContext";
import { CoreContext } from "./shared/react/CoreContext";
import theme from "./Theme";
import { filterStyles, FilterHeader } from "./Filter_styles";
import { lighten, darken, toColorString } from "polished";
import RangeSlider from "@jesster2k10/react-native-range-slider";
import rgbHex from "rgb-hex";

let sliderPressed = false;

function FilterPopularity() {
  const { popularityIntervals } = useContext(CoreContext);
  const { popularityFilter, setPopularityFilter } = useContext(SearchContext);
  const [initialSliderMax] = useState(getIinitialSliderMax());
  const [initialSliderMin] = useState(getIinitialSliderMin());

  useEffect(() => {
    sliderPressed = false;
  }, []);

  function onValueChange(val) {
    setSliderVal(val);
    const filterVal = val === popularityIntervals.length - 1 ? -1 : popularityIntervals[val];
    setPopularityFilter(filterVal);
  }

  function getIinitialSliderMax() {
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

  function getIinitialSliderMin() {
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

  function onChange(min, max) {
    if (sliderPressed) {
      const maxVal = max === popularityIntervals.length - 1 ? -1 : popularityIntervals[max];
      const minVal = min === 0 ? -1 : popularityIntervals[min];
      setPopularityFilter(minVal, maxVal);
    }
  }

  function getText() {
    let text = "";
    if (popularityFilter.max === -1 && popularityFilter.min === -1) {
      text = <View style={styles.textContainer}><Text style={styles.textUnits}>All</Text></View>
    } else {
      if (popularityFilter.max === -1) {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>At least </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityFilter.min)}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      } else if (popularityFilter.min === -1) {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Up to </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityFilter.max)}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      } else {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Between </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityFilter.min)}</Text>
            <Text style={styles.text}> and </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityFilter.max)}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        )
      }
    }

    return text;
  }

  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"Popularity"} />
      <View style={[filterStyles.bodyContainer, styles.body]}>
        {getText()}

        <Pressable
          onPressIn={() => {
            sliderPressed = true;
          }}
        >
          <RangeSlider
            min={0}
            max={popularityIntervals.length - 1}
            step={1}
            lineHeight={3}
            hideLabels={true}
            // handleDiameter={20}
            // minDistance={1}
            tintColor={lighten(0.07, theme.colors.background2)}
            tintColorBetweenHandles={rgbHex(theme.colors.primary)}
            handleColor={lighten(0.0, theme.fonts.colors.primary)}
            // tintColor={"#da0f22"}
            // handleBorderWidth={1}
            // handleBorderColor="#454d55"
            minDistance={popularityIntervals.length / 15}
            selectedMinimum={initialSliderMin}
            selectedMaximum={initialSliderMax}
            style={styles.slider}
            onChange={onChange}
            // style={{ flex: 1, height: 70, padding: 10, backgroundColor: "#ddd" }}
          />
        </Pressable>

        {/* <Text style={styles.text}>
          {sliderVal === popularityIntervals.length - 1
            ? "All"
            : numberWithCommas(popularityIntervals[sliderVal]) + " ratings or less"}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={popularityIntervals.length - 1}
          step={1}
          //value={mapPopularityFilterToSlider()} // Slider isn't a controlled component, 'value' is just used to set initial state
          onValueChange={onValueChange}
          minimumTrackTintColor={lighten(0.0, theme.colors.primary)}
          maximumTrackTintColor={lighten(0.07, theme.colors.background2)}
          thumbTintColor={theme.colors.primary}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {},

  body: {
    paddingHorizontal: theme.rem * 1,
  },

  slider: {
    // padding: theme.rem * 1,
    // paddingHorizontal: theme.rem * 2,
    marginTop: 0,
  },
  textContainer: {
    padding: theme.rem * 1,
    paddingBottom: theme.rem * 0.25,
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

export default memo(FilterPopularity);
