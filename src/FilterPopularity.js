import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Platform, Switch } from "react-native";
import { numberWithCommas } from "./shared/react/Misc";
import { SearchContext } from "./shared/react/SearchContext";
import { CoreContext } from "./shared/react/CoreContext";
import { ThemeContext } from "./ThemeContext";
import { getFilterStyles, FilterHeader } from "./Filter_styles";
import { lighten, darken, toColorString } from "polished";
import { MultiSlider } from "./Common";

// export function getPopularityScoreFromIndex(index) {
//   // return parseFloat(((index + 1) / 100).toFixed(2))
//   return parseInt(index + 1)
// }

function FilterPopularity(props) {
  const { theme } = useContext(ThemeContext);
  const { popularityIntervals } = useContext(CoreContext);
  const { popularityFilter, setPopularityFilter } = useContext(SearchContext);
  const [sliderVal, setSliderVal] = useState(0);

  const styles = getStyles(theme);
  const filterStyles = getFilterStyles(theme);

  useEffect(() => {
    // function getSliderMax() {
    //   if (popularityFilter.max === -1) {
    //     return popularityIntervals.length - 1;
    //   }

    //   for (let i = 0; i < popularityIntervals.length; i++) {
    //     if (popularityIntervals[i] >= popularityFilter.max) {
    //       return i;
    //     }
    //   }

    //   return 1;
    // }

    // function mapPopularityFilterToSliderVal() {
    //   for (let i = popularityIntervals.length - 1; i > 0; i--) {
    //     if (popularityIntervals[i] <= popularityFilter.ratingCount) {
    //       return i;
    //     }
    //   }
    //   return 0;
    // }

    setSliderVal(popularityFilter.index);
  }, [popularityIntervals, popularityFilter]);

  function getText() {
    let textView = <Text></Text>;
    rankingValue = numberWithCommas(popularityIntervals[sliderVal])

    if (
      (sliderVal === 0 && popularityFilter.ascending) ||
      (sliderVal === popularityIntervals.length - 1 && !popularityFilter.ascending)
    ) {
      textView = (
        <View style={styles.textContainer}>
          <Text style={styles.textUnits}>All</Text>
        </View>
      );
    } 
    // else if (
    //   (sliderVal === 0 && !popularityFilter.descending) ||
    //   (sliderVal === popularityIntervals.length - 1 && popularityFilter.ascending)
    // ) {
    //   textView = (
    //     <View style={styles.textContainer}>
    //       <Text style={styles.textUnits}>{rankingValue}</Text>
    //     </View>
    //   );
    // } 
    else if (!popularityFilter.ascending) {
      textView = (
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>{'Up to '}</Text> */}
          <Text style={styles.textUnits}>{rankingValue}</Text>
          {/* <Text style={styles.text}>{' ratings'}</Text> */}
          <Text style={styles.text}>{' or fewer ratings'}</Text>
        </View>
      );
    } else {
      textView = (
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>{'At least '}</Text> */}
          <Text style={styles.textUnits}>{rankingValue}</Text>
          <Text style={styles.text}>{' or more ratings'}</Text>
        </View>
      );
    }

    return textView;

    // const sliderMin = sliderVal.min === -1 ? 0 : sliderVal.min;
    // const sliderMax = sliderVal.max === -1 ? popularityIntervals.length - 1 : sliderVal.max;

    // if (popularityIntervals.length === 0 || (sliderMin === 0 && sliderMax === popularityIntervals.length - 1)) {
    //   text = (
    //     <View style={styles.textContainer}>
    //       <Text style={styles.textUnits}>All</Text>
    //     </View>
    //   );
    // } else if (sliderVal.min === sliderVal.max) {
    //   text = (
    //     <View style={styles.textContainer}>
    //       <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
    //       <Text style={styles.text}> ratings </Text>
    //     </View>
    //   );
    // } else {
    //   if (sliderVal.max === popularityIntervals.length - 1) {
    //     text = (
    //       <View style={styles.textContainer}>
    //         <Text style={styles.text}>At least </Text>
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
    //         <Text style={styles.text}> ratings </Text>
    //       </View>
    //     );
    //   } else if (sliderVal.min === 0) {
    //     text = (
    //       <View style={styles.textContainer}>
    //         <Text style={styles.text}>Up to </Text>
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMax])}</Text>
    //         <Text style={styles.text}> ratings </Text>
    //       </View>
    //     );
    //   } else {
    //     text = (
    //       <View style={styles.textContainer}>
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
    //         <Text style={styles.text}> to </Text>
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMax])}</Text>
    //         <Text style={styles.text}> ratings </Text>
    //       </View>
    //     );
    //   }
    // }
  }

  function updatePopularityFilter(index, ascending) {
    let ratingCount = popularityIntervals[index];
    if ((index === 0 && ascending) || (index === popularityIntervals.length - 1 && !ascending)) {
      ratingCount = -1;
    }
    setPopularityFilter(ratingCount, index, ascending);
  }

  function onChange(valArray) {
    setSliderVal(valArray[0]);
  }

  function onChangeFinish(valArray) {
    setSliderVal(valArray[0]);
    updatePopularityFilter(valArray[0], popularityFilter.ascending);
    props.setScrollEnabled(true);
  }

  function onSwitchChange(on) {
    updatePopularityFilter(sliderVal, on);
  }

  const switchBackground = theme.isDark ? darken(0.05, theme.colors.secondary) : lighten(0.05, theme.colors.secondary);
  const sliderTrackSelectedColor = popularityFilter.ascending ? theme.colors.secondary : theme.colors.primary;
  const sliderTrackColor = popularityFilter.ascending ? theme.colors.primary : theme.colors.secondary;

  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"Popularity"} />
      <View style={[filterStyles.bodyContainer, styles.body]}>
        {getText()}

        <MultiSlider
          parentContainerStyle={{ marginHorizontal: theme.rem }}
          values={[sliderVal]}
          min={0}
          max={popularityIntervals.length - 1}
          allowOverlap={true}
          trackStyle={{ height: 3, backgroundColor: sliderTrackColor }}
          selectedStyle={{ height: 3, backgroundColor: sliderTrackSelectedColor }}
          onValuesChangeStart={() => props.setScrollEnabled(false)}
          onValuesChangeFinish={onChangeFinish}
          onValuesChange={onChange}
        />
        <View style={styles.switchContainer}>
          <Text style={filterStyles.headerText}>Direction </Text>
          <Switch
            trackColor={{ false: switchBackground, true: switchBackground }}
            thumbColor={theme.colors.primary}
            ios_backgroundColor={switchBackground}
            onValueChange={onSwitchChange}
            value={popularityFilter.ascending}
          />
        </View>

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
    switchContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      margin: theme.rem,
      marginTop: 0,
      marginBottom: theme.rem,
    },
  });
}
