import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { numberWithCommas } from "./shared/react/Misc";
import cardItemStyles from "./CardItem_styles"
import theme from './Theme';

//////////
export default function SearchCountCard(props) {
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

  return (
    <>
      <View style={[styles.card, cardItemStyles.cardItem]}>
        <Text style={cardItemStyles.titleText}>{text}</Text>
      </View>
    </>
  );
}


