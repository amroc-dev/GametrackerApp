import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import { ThemeContext } from "@root/ThemeContext";
import getCardItemStyles from "../../styles/CardItem_styles";
import PropTypes from "prop-types";

export default function LoadingSpinner(props) {
  const { theme } = useContext(ThemeContext);

  const cardItemStyles = getCardItemStyles(theme);
  const style = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    height: cardItemStyles.cardHeight + cardItemStyles.cardSpacing,
  }

  const size = props.size ? props.size : 48

  let indicator = <Wave size={size} color={theme.colors.primary} />

  if (props.type && props.type === 'networkError') {
    const networkErrorStyle = {
      color: theme.fonts.colors.primary,
      fontSize: theme.fonts.sizes.primary,
    };
    indicator = <Text style={networkErrorStyle}>Network error</Text>;
  }

  return (
    <View style={style}>
      {indicator}
    </View>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string,
};