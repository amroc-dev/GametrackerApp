import React, { memo, useState, useEffect, useContext, useRef } from "react";
import { View, Text, Image, StyleSheet, Linking, Pressable } from "react-native";
import { monthMap, formatRatingCount, objectKeyFromDotString } from "@shared/react/Misc";
import getStyles from "@styles/CardItem_styles";
import { ThemeContext } from "@root/ThemeContext";
import ImageFadeIn from "@components/common/ImageFadeIn";
const dbkeys = require("@shared/back-end/db-keys");
import { Separator } from "@components/common/Misc";
import { transparentize } from "polished";
import * as StoreViewManager from "react-native-store-view";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";

function getDate(dateString, includeDay = false) {
  const releaseDateObj = new Date(dateString);
  const month = monthMap[parseInt(releaseDateObj.getUTCMonth() + 1)];
  if (includeDay) {
    return `${releaseDateObj.getUTCDate()} ${month} ${releaseDateObj.getUTCFullYear()}`;
  } else {
    return `${month} ${releaseDateObj.getUTCFullYear()}`;
  }
}

function CardItem2(props) {
  const { doc } = props;
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  const doc_releaseDate = objectKeyFromDotString(doc, dbkeys.releaseDate);
  const doc_recentReleaseDate = objectKeyFromDotString(doc, dbkeys.currentVersionReleaseDate);
  const doc_popularity = objectKeyFromDotString(doc, dbkeys.popularity);
  const doc_ratingCount = objectKeyFromDotString(doc, dbkeys.ratingCountCurrentVersion);
  const doc_rating = objectKeyFromDotString(doc, dbkeys.ratingCurrentVersion);
  const doc_formattedPrice = objectKeyFromDotString(doc, dbkeys.formattedPrice);
  const doc_trackName = objectKeyFromDotString(doc, dbkeys.trackName);
  const doc_trackId = objectKeyFromDotString(doc, dbkeys.trackId);
  const doc_artistName = objectKeyFromDotString(doc, dbkeys.artistName);
  const doc_artworkUrl = objectKeyFromDotString(doc, dbkeys.artworkUrl);
  const doc_screens = objectKeyFromDotString(doc, dbkeys.screenshotUrls);

  //const releaseDate = getDate(doc_releaseDate, false)// + " (" + getDate(doc_recentReleaseDate, true) + ")"
  const releaseDateElem = props.showRecentReleaseDate ? (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <Text style={[styles.releaseDate, { flex: 0, fontSize: theme.fonts.sizes.mini * 0.9 }]}>Updated</Text>
      <Text style={[styles.releaseDate, { flex: 0 }]}>{getDate(doc_recentReleaseDate, true)}</Text>
    </View>
  ) : (
    <Text style={styles.releaseDate}>{getDate(doc_releaseDate, true)}</Text>
  );

  //////// rating
  let rating = parseFloat(parseFloat(doc_rating).toFixed(1));
  let ratingCellColour = theme.colors.rating.na;
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
  } else if (doc_ratingCount === 0) {
    rating = "-";
  }

  const ratingCellColor = { backgroundColor: ratingCellColour };
  const ratingCountElem = formatRatingCount(doc_ratingCount);
  const formattedPriceElem = doc_formattedPrice;

  async function onTap() {
    StoreViewManager.loadProductWithParameters({
      iTunesItemIdentifier: doc_trackId,
      //, affiliateToken: 'string, optional, iOS 8.0+'
      //, campaignToken: 'string, optional, iOS 8.0+'
      //, providerToken: 'string, optional, iOS 8.3+'
      //, advertisingPartnerToken: 'string, optional, iOS 9.3+'
    })
      .then(() => {
        // here when content loaded
      })
      .then(() => {
        // here when modal dismissed
      })
      .catch((err) => {
        console.error(err);
      });

    try {
      StoreViewManager.presentViewController();
    } catch (err) {}
  }

  return (
    <Pressable onPress={onTap} style={styles.cardItem}>
      <ImageFadeIn
        resizeMethod="resize"
        style={styles.image}
        duration={theme.fadeSpeed}
        source={{ uri: doc_screens[0] }}
      />
    </Pressable>
  );
}

export default memo(CardItem2);
