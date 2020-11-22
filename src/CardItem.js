import React, { memo, useState, useEffect, useContext, useRef } from "react";
import { View, Text, Image, StyleSheet, Linking, Pressable } from "react-native";
import { monthMap, formatRatingCount, objectKeyFromDotString } from "./shared/react/Misc";
import getStyles from "./CardItem_styles";
import { ThemeContext } from "./ThemeContext";
import ImageFadeIn from "./ImageFadeIn";
const dbkeys = require("./shared/back-end/db-keys");

function CardItem({ doc }) {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  const doc_releaseDate = objectKeyFromDotString(doc, dbkeys.releaseDate);
  const doc_popularity = objectKeyFromDotString(doc, dbkeys.popularity);
  const doc_rating = objectKeyFromDotString(doc, dbkeys.rating);
  const doc_formattedPrice = objectKeyFromDotString(doc, dbkeys.formattedPrice);
  const doc_trackName = objectKeyFromDotString(doc, dbkeys.trackName);
  const doc_trackId = objectKeyFromDotString(doc, dbkeys.trackId);
  const doc_artistName = objectKeyFromDotString(doc, dbkeys.artistName);
  const doc_artworkUrl = objectKeyFromDotString(doc, dbkeys.artworkUrl);

  const releaseDateArr = doc_releaseDate.split("-");
  const month = monthMap[parseInt(releaseDateArr[1])];
  const releaseDate = `${releaseDateArr[2]} ${month} ${releaseDateArr[0]}`;

  //////// rating
  const countForCurrentVersion = doc_popularity;
  let rating = "-";
  let ratingCellColour = theme.colors.rating.na;

  const ratingVal = parseFloat(doc_rating);
  const remainder = Math.abs(ratingVal - Math.round(ratingVal));
  const fixedDigits = remainder < 0.1 ? 0 : 1;

  rating = ratingVal.toFixed(fixedDigits);
  if (countForCurrentVersion >= 5) {
    ratingCellColour = theme.colors.rating.good;

    if (rating < 4) {
      ratingCellColour = theme.colors.rating.average;
    }
    if (rating < 3) {
      ratingCellColour = theme.colors.rating.bad;
    }
    rating = Math.round(rating * 2);
  } else {
    rating = "-";
  }

  const ratingCellColor = { backgroundColor: ratingCellColour };
  const ratingCountElem = formatRatingCount(countForCurrentVersion);
  const formattedPriceElem = doc_formattedPrice;

  async function onTap() {
    await Linking.openURL("itms-apps://apps.apple.com/id/app/id" + doc_trackId).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Pressable onPress={onTap}>
      <View style={styles.cardItem}>
        <ImageFadeIn style={styles.image} duration={theme.transitionSpeed} source={{ uri: doc_artworkUrl }} />
        <View style={styles.dataContainer}>
          <View style={styles.topRowContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{doc_trackName}</Text>
              <Text style={styles.artistText}>{doc_artistName}</Text>
            </View>
          </View>
          <View style={styles.bottomRowContainer}>
            <Text style={styles.releaseDate}>{releaseDate}</Text>
            <View style={styles.ratingContainer}>
              <View style={[ratingCellColor, styles.ratingCell]}>
                <Text style={styles.ratingValue}>{rating}</Text>
              </View>
              <Text style={styles.ratinCount}>{ratingCountElem}</Text>
            </View>
            <Text style={styles.price}>{formattedPriceElem}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default memo(CardItem);
