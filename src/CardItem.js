import React, {memo, useState, useEffect, useContext, useRef} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  monthMap,
  formatRatingCount,
  objectKeyFromDotString,
} from './shared/react/Misc';
import styles from "./CardItem_styles";
import theme from './Theme';
const dbkeys = require('./shared/back-end/db-keys');

function CardItem({doc}) {
  ////////// release date

  const doc_releaseDate = objectKeyFromDotString(doc, dbkeys.releaseDate);
  const doc_popularity = objectKeyFromDotString(doc, dbkeys.popularity);
  const doc_rating = objectKeyFromDotString(doc, dbkeys.rating);
  const doc_formattedPrice = objectKeyFromDotString(doc, dbkeys.formattedPrice);
  const doc_trackName = objectKeyFromDotString(doc, dbkeys.trackName);
  const doc_artistName = objectKeyFromDotString(doc, dbkeys.artistName);

  const releaseDateArr = doc_releaseDate.split('-');
  const month = monthMap[parseInt(releaseDateArr[1])];
  const releaseDate = `${releaseDateArr[2]} ${month} ${releaseDateArr[0]}`;

  //////// rating
  const countForCurrentVersion = doc_popularity;
  let rating = '-';
  let ratingCellColour = 'rgba(125, 145, 165, 1)';

  const ratingVal = parseFloat(doc_rating);
  const remainder = Math.abs(ratingVal - Math.round(ratingVal));
  const fixedDigits = remainder < 0.1 ? 0 : 1;

  rating = ratingVal.toFixed(fixedDigits);
  if (countForCurrentVersion >= 5) {
    ratingCellColour = 'rgb(92, 184, 92)';

    if (rating < 4) {
      ratingCellColour = 'rgb(225, 180, 48)';
    }
    if (rating < 3) {
      ratingCellColour = 'rgb(225, 0, 0)';
    }
    rating = Math.round(rating * 2);
  } else {
    rating = '-';
  }

  const ratingCellColor = {backgroundColor: ratingCellColour};
  const ratingCountElem = formatRatingCount(countForCurrentVersion);
  const formattedPriceElem = doc_formattedPrice;

  return (
    <View style={styles.cardItem}>
      <Image
        style={styles.image}
        source={{uri: doc.searchBlob.artworkUrl512}}
      />
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
  );
}

export default memo(CardItem)
