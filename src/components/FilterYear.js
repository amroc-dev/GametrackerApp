import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { numberWithCommas } from "@shared/react/Misc";
import { SearchContext } from "@shared/react/SearchContext";
import { CoreContext } from "@shared/react/CoreContext";
import { ThemeContext } from "@root/ThemeContext";
import { getFilterStyles, FilterHeader } from "@styles/Filter_styles";
import { lighten, darken, toColorString } from "polished";
import { Clamp } from "@components/common/Misc";
import { MultiSlider } from "@components/common/MultiSlider";
import rgbHex from "rgb-hex";

export const MIN_VAL = 1.9;
export const MAX_VAL = 5;

function FilterYear(props) {
  const { theme } = useContext(ThemeContext);
  const { ratingFilter, setRatingFilter } = useContext(SearchContext);
  const [sliderVal, setSliderVal] = useState(MIN_VAL);

  const styles = getStyles(theme);
  const filterStyles = getFilterStyles(theme);

  useEffect(() => {
    setSliderVal(Clamp(ratingFilter, MIN_VAL, MAX_VAL));
  }, [ratingFilter]);

  function getText() {
    let text = <Text></Text>;
    const val = sliderVal;
    if (val <= MIN_VAL) {
      text = (
        <View style={styles.textContainer}>
          <Text style={styles.textUnits}>...</Text>
        </View>
      );
    } else if (val < MAX_VAL) {
      text = (
        <View style={styles.textContainer}>
            <Text style={styles.text}>At least </Text>
            <Text style={styles.textUnits}>{val} ★</Text>

        </View>
      );
    } else {
      text = (
      <View style={styles.textContainer}>
        <Text style={styles.textUnits}>{val} ★</Text>

      </View>
      )
    }
    return text;
  }

  function onChange(vals) {
    setSliderVal(parseFloat(vals[0].toFixed(1)));
  }

  function onChangeFinish(vals) {
    onChange(vals);
    let val = parseFloat(vals[0].toFixed(1))
    if (val === MIN_VAL) val = -1
    setRatingFilter(val);
    props.setScrollEnabled(true);
  }



  return (
    <View style={[filterStyles.outerContainer, styles.outer]}>
      <FilterHeader title={"Year"} />
      <View style={[filterStyles.bodyContainer, styles.body]}>
        {getText()}
        <MultiSlider
          parentContainerStyle={filterStyles.multiSliderParentContainer}
          values={[sliderVal]}
          min={MIN_VAL}
          max={MAX_VAL}
          step={0.1}
          // snapped={true}
          onValuesChangeStart={() => props.setScrollEnabled(false)}
          onValuesChangeFinish={onChangeFinish}
          onValuesChange={onChange}
          allowOverlap={true}
          selectedStyle={{
            height: 3,
            backgroundColor: theme.colors.secondary,
          }}
          trackStyle={{
            height: 3,
            backgroundColor: theme.colors.primary,
          }}
        />
      </View>
    </View>
  );
}

export default memo(FilterYear);

function getStyles(theme) {
  return StyleSheet.create({
    outer: {},
    body: {
      paddingHorizontal: theme.rem * 0.5,
    },
    slider: {},
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
