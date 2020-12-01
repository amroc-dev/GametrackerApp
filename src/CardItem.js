import React, { memo, useState, useEffect, useContext, useRef } from "react";
import { View, Text, Image, StyleSheet, Linking, Pressable } from "react-native";
import { monthMap, formatRatingCount, objectKeyFromDotString } from "./shared/react/Misc";
import getStyles from "./CardItem_styles";
import { ThemeContext } from "./ThemeContext";
import ImageFadeIn from "./ImageFadeIn";
const dbkeys = require("./shared/back-end/db-keys");
import { Separator } from "./Common";

function CardItem({ doc }) {
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  const doc_releaseDate = objectKeyFromDotString(doc, dbkeys.releaseDate);
  // const doc_popularity = objectKeyFromDotString(doc, dbkeys.popularity);
  const doc_ratingCount = objectKeyFromDotString(doc, dbkeys.ratingCountCurrentVersion);
  const doc_rating = objectKeyFromDotString(doc, dbkeys.ratingCurrentVersion);
  const doc_formattedPrice = objectKeyFromDotString(doc, dbkeys.formattedPrice);
  const doc_trackName = objectKeyFromDotString(doc, dbkeys.trackName);
  const doc_trackId = objectKeyFromDotString(doc, dbkeys.trackId);
  const doc_artistName = objectKeyFromDotString(doc, dbkeys.artistName);
  const doc_artworkUrl = objectKeyFromDotString(doc, dbkeys.artworkUrl);

  const releaseDateArr = doc_releaseDate.split("-");
  const month = monthMap[parseInt(releaseDateArr[1])];
  const releaseDate = `${releaseDateArr[2]} ${month} ${releaseDateArr[0]}`;

  //////// rating
  let rating = "-";
  let ratingCellColour = theme.colors.rating.na;

  const ratingVal = parseFloat(doc_rating);
  const remainder = Math.abs(ratingVal - Math.round(ratingVal));
  const fixedDigits = remainder < 0.1 ? 0 : 1;

  rating = ratingVal.toFixed(fixedDigits);
  if (doc_ratingCount >= 5) {
    ratingCellColour = theme.colors.rating.good;

    if (rating < 4) {
      ratingCellColour = theme.colors.rating.average;
    }
    if (rating < 3) {
      ratingCellColour = theme.colors.rating.bad;
    }
    // rating *= 2;
    // rating = Math.round(rating * 20);
  } else {
    // rating = "-";
  }

  const ratingCellColor = { backgroundColor: ratingCellColour };
  const ratingCountElem = formatRatingCount(doc_ratingCount);
  const formattedPriceElem = doc_formattedPrice;

  async function onTap() {
    await Linking.openURL("itms-apps://apps.apple.com/id/app/id" + doc_trackId).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Pressable onPress={onTap} style={styles.cardItem}>
      <ImageFadeIn
        resizeMethod="resize"
        style={styles.image}
        duration={theme.fadeSpeed}
        source={{ uri: doc_artworkUrl }}
      />
      <View style={styles.dataContainer}>
        <View style={styles.topRowContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.titleText}>
              {doc_trackName}
            </Text>
            <Text numberOfLines={1} style={styles.artistText}>
              {doc_artistName}
            </Text>
            {/* <Text numberOfLines={2} style={styles.artistText}>
              {"sb.averageUserRating: " + doc.searchBlob.averageUserRating}
            </Text>
            <Text numberOfLines={2} style={styles.artistText}>
              {"sb.averageUserRatingForCV: " + doc.searchBlob.averageUserRatingForCurrentVersion}
            </Text>
            <Text numberOfLines={2} style={styles.artistText}>
              {"sb.userRatingCountForCV: " + doc.searchBlob.userRatingCountForCurrentVersion}
            </Text>
            <Text numberOfLines={2} style={styles.artistText}>
              {"lb.userRating.value: " + doc.lookupBlob.userRating.value}
            </Text>
            <Text numberOfLines={2} style={styles.artistText}>
              {"lb.userRating.valueCurrentVersion: " + doc.lookupBlob.userRating.valueCurrentVersion}
            </Text>
            <Text numberOfLines={2} style={styles.artistText}>
              {"lb.userRating.ratingCount: " + doc.lookupBlob.userRating.ratingCount}
            </Text>
            <Text numberOfLines={2} style={styles.artistText}>
              {"lb.userRating.ratingCountCurrentVersion: " + doc.lookupBlob.userRating.ratingCountCurrentVersion}
            </Text> */}
            {/* <Text numberOfLines={2} style={styles.artistText}></Text> */}
          </View>
        </View>
        <View style={styles.bottomRowContainer}>
          <Text style={styles.releaseDate}>{releaseDate}</Text>
          <View style={styles.ratingContainer}>
            <View style={[ratingCellColor, styles.ratingCell]}>
              <Text style={styles.ratingValue}>{rating}</Text>
            </View>
            <Text style={styles.ratingCount}>{ratingCountElem}</Text>
          </View>
          <Text style={styles.price}>{formattedPriceElem}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default memo(CardItem);
