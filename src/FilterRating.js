import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { numberWithCommas } from "./shared/react/Misc";
import { SearchContext } from "./shared/react/SearchContext";
import { CoreContext } from "./shared/react/CoreContext";
import { ThemeContext } from "./ThemeContext";
import { getFilterStyles, FilterHeader } from "./Filter_styles";
import { lighten, darken, toColorString } from "polished";
import {MultiSlider} from "./Common"
import rgbHex from "rgb-hex";

let sliderPressed = false;

function FilterRating(props) {
  const { theme } = useContext(ThemeContext);
  // const { ratingFilter, setRatingFilter } = useContext(SearchContext);
  const [sliderValRead, setSliderValRead] = useState(0);
  const [sliderValWrite, setSliderValWrite] = useState(0);

  const styles = getStyles(theme);
  const filterStyles = getFilterStyles(theme);

  useEffect(() => {
    sliderPressed = false;
  }, []);

  // useEffect(() => {
  //   console.log("RF: " + ratingFilter);
  //   setSliderValWrite(ratingFilter);
  // }, [ratingFilter]);

  // useEffect(() => {
  //   setSliderValWrite(ratingFilter);
  // }, []);

  function onChange(min, max) {
    console.log(max);
    setSliderValRead(max);
  }

  function getText() {
    let text = <Text></Text>;
    // const sliderMin = sliderValRead.min === -1 ? 0 : sliderValRead.min;
    // const sliderMax = sliderValRead.max === -1 ? popularityIntervals.length - 1 : sliderValRead.max;

    // if (popularityIntervals.length === 0 || (sliderMin === 0 && sliderMax === popularityIntervals.length - 1)) {
    //   text = (
    //     <View style={styles.textContainer}>
    //       <Text style={styles.textUnits}>All</Text>
    //     </View>
    //   );
    // } else {
    //   if (sliderValRead.max === popularityIntervals.length - 1) {
    //     text = (
    //       <View style={styles.textContainer}>
    //         <Text style={styles.text}>Min </Text>
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
    //         <Text style={styles.text}> ratings </Text>
    //       </View>
    //     );
    //   } else if (sliderValRead.min === 0) {
    //     text = (
    //       <View style={styles.textContainer}>
    //         <Text style={styles.text}>Max </Text>
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMax])}</Text>
    //         <Text style={styles.text}> ratings </Text>
    //       </View>
    //     );
    //   } else {
    //     text = (
    //       <View style={styles.textContainer}>
    //         {/* <Text style={styles.text}>Min </Text> */}
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMin])}</Text>
    //         <Text style={styles.text}> to </Text>
    //         <Text style={styles.textUnits}>{numberWithCommas(popularityIntervals[sliderMax])}</Text>
    //         <Text style={styles.text}> ratings </Text>
    //       </View>
    //     );
    //   }
    // }

    return text;
  }

  const [hitSlop, setHitSlop] = useState(0);

  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"User rating"} />
      <View style={[filterStyles.bodyContainer, styles.body]}>
        {getText()}

        <MultiSlider
          onValuesChangeStart={() => props.setScrollEnabled(false)}
          onValuesChangeFinish={() => props.setScrollEnabled(true)}
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
            console.log("SVR: " + sliderValRead);
            setRatingFilter(sliderValRead);
            setHitSlop(0);
          }}
        > */}
        {/* <RangeSlider
            type="slider"
            style={styles.slider}
            min={0}
            max={50}
            step={10}
            lineHeight={3}
            hideLabels={true}
            tintColorBetweenHandles={lighten(0.0, theme.colors.secondary)}
            handleColor={rgbHex(theme.colors.primary)}
            tintColor={lighten(0.0, theme.colors.primary)}
            // minDistance={popularityIntervals.length / 20}
            // selectedMinimum={sliderValWrite}
            // selectedMaxiumum={sliderValWrite}
            onChange={onChange}
          /> */}
        {/* </Pressable> */}
      </View>
    </View>
  );
}

export default memo(FilterRating);

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
