import {padding} from 'polished';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import theme from './Theme';

const dateMap = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Aug',
  9: 'Sept',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

//////////
function formatRatingCount(rating) {
  let val = rating;

  if (val >= 10000) {
    val = parseInt(val / 1000) + 'k';
  } else if (val >= 1000) {
    val = numberWithCommas(val);
  } else if (val < 5) val = '';

  return val;
}

export default function CardItem({doc}) {
  ////////// release date

  const releaseDateArr = doc.lookupBlob.releaseDate.split('-');
  const month = dateMap[parseInt(releaseDateArr[1])];
  const releaseDate = `${releaseDateArr[2]} ${month} ${releaseDateArr[0]}`;

  //////// rating
  const countForCurrentVersion = doc.lookupBlob.userRating.ratingCount;
  let rating = '-';
  let ratingCellColour = 'rgba(125, 145, 165, 1)';

  const ratingVal = parseFloat(doc.lookupBlob.userRating.value);
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
  const formattedPriceElem = doc.searchBlob.formattedPrice;

  return (
    <View style={styles.cardItem}>
      <Image
        style={styles.image}
        source={{uri: doc.searchBlob.artworkUrl512}}
      />
      <View style={styles.dataContainer}>
        <View style={styles.topRowContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{doc.searchBlob.trackName}</Text>
            <Text style={styles.artistText}>{doc.searchBlob.artistName}</Text>
          </View>
        </View>
        <View style={styles.bottomRowContainer}>
          <Text style={styles.releaseDate}>{releaseDate}</Text>
          <View style={styles.ratingContainer}>
            <View style={Object.assign(ratingCellColor, styles.ratingCell)}>
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

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background2,
    borderRadius: theme.borderRadius,
    marginTop: theme.rem * 0.5,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius,
  },

  dataContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: theme.rem * 0.15,
    paddingHorizontal: theme.rem * 0.35,
    // backgroundColor: 'red',
  },

  topRowContainer: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    // backgroundColor: 'green',
  },

  bottomRowContainer: {
    flex: 1,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: theme.rem * -1.5,
  },

  titleContainer: {},

  titleText: {
    color: theme.fonts.colors.title,
    fontSize: theme.fonts.sizes.primaryBold,
    fontWeight: '600',
  },

  artistText: {
    color: theme.fonts.colors.secondary,
    fontSize: theme.fonts.sizes.secondary,
  },

  releaseDate: {
    flex: 1,
    color: theme.fonts.colors.secondary,
    fontSize: theme.fonts.sizes.secondary,
    width: 100,
  },

  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },

  ratingCell: {
    marginRight: theme.rem * 0.5,
    marginTop: theme.rem * 0.75,
    width: 32,
    height: 32,
    display: 'flex',
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
    marginBottom: theme.rem * 0.15,
  },

  ratingValue : {
    color: "white",
    alignSelf : "center",
    fontSize: theme.fonts.sizes.rating,
  }, 

  ratinCount: {
    color: theme.fonts.colors.secondary,
    fontSize: theme.fonts.sizes.secondary,
  },

  price : {
    color: "white",
    flex: 0,
    fontSize: theme.fonts.sizes.primary,
  }, 

});
