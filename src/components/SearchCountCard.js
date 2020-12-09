import React, { useContext } from "react";
import {View, Text, StyleSheet} from 'react-native';
import { numberWithCommas } from "@shared/react/Misc";
import getStyles from "@styles/CardItem_styles"
import { ThemeContext } from "@root/ThemeContext";

//////////
export default function SearchCountCard(props) {
  const { theme } = useContext(ThemeContext)
  
  let text = props.errorMessage ? props.errorMessage : "No results";
  if (props.count > 0) {
    text = `Showing ${numberWithCommas(props.count)} results`;

    if (props.count === 1) {
      text = text.slice(0, -1);
    }
  }

  const styles = StyleSheet.create({
    card: {
      margin: 0,
      padding: theme.rem * 0.5,
    },
  });

  const cardItemStyles = getStyles(theme)

  return (
    <>
      <View style={[styles.card, cardItemStyles.cardItem]}>
        <Text style={cardItemStyles.titleText}>{text}</Text>
      </View>
    </>
  );
}


