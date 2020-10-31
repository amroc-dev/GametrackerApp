import React, { useContext, useEffect, useLayoutEffect, useState, memo } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, LayoutAnimation } from "react-native";
import { CoreContext } from "./shared/react/CoreContext";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";
import { filterStyles, FilterHeader } from "./Filter_styles";
import { SearchBar } from "react-native-elements";
import { rgba } from "polished";
import { FilterTagsContext, FiterTagsContext } from "./shared/react/FilterTagsContext";
import { SearchInput } from "./Common";

function FilterTags() {
  const { tags } = useContext(CoreContext);
  const { tagSearchField, setTagSearchField } = useContext(FilterTagsContext);
  const [tagColumns, setTagColumns] = useState([]);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useEffect(() => {
    if (!tags) {
      return;
    }

    let groups = [];
    tags.map((t) => {
      if (groups.length === 0 || groups[groups.length - 1].length === 10) {
        groups.push([]);
      }

      const currentGroup = groups[groups.length - 1];

      if (tagSearchField.length === 0) currentGroup.push(t);
      else if (t.name.toLowerCase().startsWith(tagSearchField.toLowerCase())) currentGroup.push(t);
      return null;
    });

    if (groups.length > 0 && groups[groups.length - 1].length === 0) {
      groups.pop();
    }

    // LayoutAnimation.configureNext({
    //   // create: {
    //   //   duration: 500,
    //   //   type: LayoutAnimation.Types.easeInEaseOut,
    //   //   property: LayoutAnimation.Properties.opacity,
    //   // },
    //   update: {
    //     duration: 250,
    //     type: LayoutAnimation.Types.easeInEaseOut,
    //     property: LayoutAnimation.Properties.opacity,
    //   },
    //   // delete: {
    //   //   duration: 500,
    //   //   type: LayoutAnimation.Types.easeInEaseOut,
    //   //   property: LayoutAnimation.Properties.opacity,
    //   // },
    // });

    setTagColumns(groups);
    setShowActivityIndicator(false);


  }, [tagSearchField, tags]);

  function renderItem({ item, index }) {
    const cardStyle = index === 0 ? [styles.tagCard, styles.tagCardFirst] : styles.tagCard;

    return (
      <View style={cardStyle}>
        {item.map((tagItem) => (
          <View style={styles.tagItem} key={tagItem.name}>
            <Text style={styles.tagName}>{tagItem.name}</Text>
            <Text style={styles.tagCount}>{tagItem.count}</Text>
          </View>
        ))}
      </View>
    );
  }

  function onChangeText(text) {
    setShowActivityIndicator(true);
    setTagSearchField(text);
  }

  const tagFlatList = (
    <FlatList
      data={tagColumns}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      initialNumToRender={5}
      horizontal={true}
      windowSize={100}
      updateCellsBatchingPeriod={5}
      style={styles.scrollView}
      indicatorStyle="white"
    />
  );

  const noMatchesText = (
    <Text style={{ marginLeft: theme.rem, marginTop: theme.rem * 0.5, color: theme.fonts.colors.secondary }}>
      No Matches
    </Text>
  );

  return (
    <>
      <View style={[filterStyles.outerContainer, styles.outer]}>
        <FilterHeader title={"Tags"} />
        {tagColumns.length > 0 ? <View style={styles.body}>{tagFlatList}</View> : noMatchesText}
        <SearchInput
          style={styles.searchInput}
          returnKeyType="done"
          placeholder={"Search " + tags.length + " tags"}
          onChangeText={onChangeText}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginBottom: 0,
  },

  body: {
    height: "auto",
    backgroundColor: theme.colors.background2,
    marginHorizontal: theme.rem * 0.5,
    borderRadius: theme.borderRadius,
  },
  scrollView: {},
  innerBody: {
    flexDirection: "column",
    flex: 1,
  },

  tags: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-start",
    margin: theme.rem * 0.5,
  },

  tagCard: {
    // marginRight: theme.rem * 0.5,
    // backgroundColor: theme.colors.background2,
    // borderRadius: theme.borderRadius,
    padding: theme.rem * 0.5,
    minWidth: 160,
  },

  tagCardFirst: {
    marginLeft: theme.rem * 0.5,
    // borderTopLeftRadius: 0,
  },

  tagItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  tagName: {
    color: theme.fonts.colors.primary,
    fontSize: theme.fonts.sizes.primary2,
    // fontWeight: theme.fonts.weights.bold,
    margin: theme.rem * 0.25,
  },

  tagCount: {
    color: theme.fonts.colors.secondary,
    fontSize: theme.fonts.sizes.mini,
  },

  // searchBarContainer: {
  //   alignSelf: "flex-end",
  //   height: theme.rowHeight + theme.rem, // * 0.5
  //   backgroundColor: rgba(0, 0, 0, 0),
  //   borderBottomLeftRadius: theme.borderRadius,
  //   borderBottomRightRadius: theme.borderRadius,
  // },
  // searchInputContainer: {
  //   height: theme.rowHeight,
  //   backgroundColor: "white",
  //   borderRadius: theme.borderRadius,
  // },
  searchInput: {
    margin: theme.rem * 0.5,
    marginBottom: 0,
  },
});

export default FilterTags;
