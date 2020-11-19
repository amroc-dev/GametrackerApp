import React, { useContext, useEffect, useLayoutEffect, useRef, useState, memo, useMemo } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, LayoutAnimation, Pressable } from "react-native";
import { CoreContext } from "./shared/react/CoreContext";
import { ThemeContext } from "./ThemeContext";
import { SearchContext } from "./shared/react/SearchContext";
import { getFilterStyles, FilterHeader } from "./Filter_styles";
import { rgba, darken, readableColor } from "polished";
import { FilterTagsContext } from "./shared/react/FilterTagsContext";
import { SearchInput, ToggleButton } from "./Common";
import { Dimensions } from "react-native";

function FilterTags(props) {
  const { theme } = useContext(ThemeContext);
  const { tags } = useContext(CoreContext);
  const { searchTags, addSearchTag, removeSearchTag } = useContext(SearchContext);
  const { tagSearchField, setTagSearchField } = useContext(FilterTagsContext);
  const [tagColumns, setTagColumns] = useState([]);
  const [tagsViewContainerWidth, setTagsViewContainerWidth] = useState(0);
  const flatListRef = useRef(null);

  const styles = getStyles(theme);
  const filterStyles = getFilterStyles(theme);

  useLayoutEffect(() => {
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

    setTagColumns(groups);
  }, [tagSearchField, tags, tagsViewContainerWidth]);

  function renderItem({ item, index }) {
    const cardStyle = [styles.tagCard, { width: tagsViewContainerWidth / 2 }];

    const items = [];

    item.forEach((tagItem) => {
      const active = searchTags.includes(tagItem.name);
      const tagNameStyle = [styles.tagName]
      const tagCountStyle = [styles.tagCount];
      if (active) {
        tagCountStyle.push(filterStyles.filterTextSelected);
        tagNameStyle.push(filterStyles.filterTextSelected);
      }

      items.push(
        <View style={styles.tagRow} key={tagItem.name}>
          <ToggleButton
            style={styles.tagButton}
            active={active}
            key={items.length}
            onPress={() => (active ? removeSearchTag(tagItem.name) : addSearchTag(tagItem.name))}
          >
            <Text numberOfLines={1} style={tagNameStyle}>
              {tagItem.name}
              <Text style={tagCountStyle}>{"  " + tagItem.count}</Text>
            </Text>
          </ToggleButton>
        </View>
      );
    });

    return <View style={cardStyle}>{items}</View>;
  }

  function onChangeText(text) {
    setTagSearchField(text);
  }

  useLayoutEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  }, [tagColumns]);

  const [noMatchesText] = useState(
    <Text style={{ marginLeft: theme.rem, marginTop: theme.rem * 0.5, color: theme.fonts.colors.secondary }}>
      No Matches
    </Text>
  );



  return useMemo(
    () => (
      <>
        <View
          onLayout={(e) => setTagsViewContainerWidth(e.nativeEvent.layout.width - theme.rem)}
          style={[filterStyles.outerContainer, styles.outer]}
        >
          <FilterHeader title={"Tags"} />
          {tagColumns.length > 0 ? (
            <View style={filterStyles.bodyContainer}>
              <FlatList
                ref={flatListRef}
                data={tagColumns}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={2}
                horizontal={true}
                windowSize={3}
                maxToRenderPerBatch={2}
                // updateCellsBatchingPeriod={16}
                style={styles.scrollView}
                indicatorStyle="white"
                showsHorizontalScrollIndicator={tagColumns.length > 2}
                // snapToInterval={tagsViewContainerWidth / 2}
                // snapToAlignment={"start"}
                pagingEnabled
                keyboardDismissMode="on-drag"
                decelerationRate={"fast"}
                getItemLayout={(data, index) => ({
                  length: tagsViewContainerWidth / 2,
                  offset: (tagsViewContainerWidth / 2) * index,
                  index,
                })}
              />
            </View>
          ) : (
            noMatchesText
          )}
          <SearchInput
            style={[filterStyles.bodyContainer, styles.searchInput]}
            returnKeyType="done"
            placeholder={"Search " + tags.length + " tags"}
            onChangeText={onChangeText}
            value={tagSearchField}
          />
        </View>
      </>
    ),
    [tagColumns, searchTags]
  );
}

export default memo(FilterTags);

function getStyles(theme) {
  return StyleSheet.create({
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
      flexDirection: "column",
      // minWidth: 160,
    },

    tagCardFirst: {
      marginLeft: theme.rem * 0.5,
      // borderTopLeftRadius: 0,
    },

    tagRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: theme.rem * 0.1,
      marginRight: theme.rem * 0.25,
      // paddingRight: theme.rem * 0.5,
      // backgroundColor: "red",
    },
    tagButton: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: theme.rem * 0.25,
      paddingHorizontal: theme.rem * 0.5,

      borderRadius: theme.pillBorderRadius,
    },
    tagName: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary,
      fontWeight: theme.fonts.weights.bold,
      // maxWidth: 166,
    },
    tagName_selected: {
      color: readableColor(theme.colors.primary),
    },
    tagCount: {
      color: theme.fonts.colors.secondary,
      fontSize: theme.fonts.sizes.mini,
    },
    tagCount_selected: {
      color: readableColor(theme.colors.primary),
    },
    searchInput: {
      marginTop: theme.rem * 0.5,
      borderRadius: theme.borderRadius2,
    },
  });
}
