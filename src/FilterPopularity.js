import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { numberWithCommas } from "./shared/react/Misc";
import { SearchContext } from "./shared/react/SearchContext";
import { CoreContext } from "./shared/react/CoreContext";
import { ThemeContext } from "./ThemeContext";
import { getFilterStyles, FilterHeader } from "./Filter_styles";
import { lighten, darken, toColorString } from "polished";
import {MultiSlider} from "./Common";

function FilterPopularity(props) {
  const { theme } = useContext(ThemeContext);
  const { popularityIntervals } = useContext(CoreContext);
  const { popularityFilter, setPopularityFilter } = useContext(SearchContext);
  const [sliderVal, setSliderVal] = useState({ min: 0, max: 10 });

  const styles = getStyles(theme)
  const filterStyles = getFilterStyles(theme)

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

    setSliderVal({ min: getSliderMin(), max: getSliderMax() });
  }, [popularityIntervals, popularityFilter]);

  function getText() {
    let text = <Text></Text>;
    const sliderMin = sliderVal.min === -1 ? 0 : sliderVal.min;
    const sliderMax = sliderVal.max === -1 ? popularityIntervals.length - 1 : sliderVal.max;

    if (popularityIntervals.length === 0 || (sliderMin === 0 && sliderMax === popularityIntervals.length - 1)) {
      text = (
        <View style={styles.textContainer}>
          <Text style={styles.textUnits}>Any popularity</Text>
        </View>
      );
    } else {
      if (sliderVal.max === popularityIntervals.length - 1) {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>At least </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      } else if (sliderVal.min === 0) {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.text}>At Most </Text>
            <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMax])}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      } else if (sliderVal.min === sliderVal.max) {
        text = (
          <View style={styles.textContainer}>
            <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
            <Text style={styles.text}> ratings </Text>
          </View>
        );
      } 
      else {
        text = (
          <View style={styles.textContainer}>
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

  function onChange(vals) {
    setSliderVal({ min: vals[0], max: vals[1] });
  }

  function onChangeFinish(vals) {
    setSliderVal({ min: vals[0], max: vals[1] });
    const minVal = vals[0] === 0 ? -1 : popularityIntervals[vals[0]];
    const maxVal = vals[1] === popularityIntervals.length - 1 ? -1 : popularityIntervals[vals[1]];
    setPopularityFilter(minVal, maxVal);
    props.setScrollEnabled(true);
  }

  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"Popularity"} />
      <View style={[filterStyles.bodyContainer, styles.body]}>
        {getText()}
        <MultiSlider
          parentContainerStyle={filterStyles.multiSliderParentContainer}
          values={[sliderVal.min, sliderVal.max]}
          min={0}
          max={popularityIntervals.length - 1}
          allowOverlap={true}
          // step={1}
          // minMarkerOverlapStepDistance={50}
          onValuesChangeStart={() => props.setScrollEnabled(false)}
          onValuesChangeFinish={onChangeFinish}
          onValuesChange={onChange}
        />
        
        {/* <Pressable
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
        </Pressable> */}
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
    textContainer: {
      paddingTop: theme.rem * 1,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
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
