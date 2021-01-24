import React, { useContext, useEffect, useLayoutEffect, useRef, useState, memo, useMemo } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, LayoutAnimation, Pressable } from "react-native";
import { CoreContext } from "@shared/react/CoreContext";
import { ThemeContext } from "@root/ThemeContext";
import { SearchContext } from "@shared/react/SearchContext";
import { SectionWithHeader } from "@components/common/Section";
import { getFilterStyles } from "styles/Filter_styles";
import { rgba, darken, readableColor, transparentize } from "polished";
import { FilterTagsContext } from "@shared/react/FilterTagsContext";
import { SearchInput } from "@components/common/SearchInput";
import { ControlledLayoutAnimation } from "@components/common/Misc";
import { ToggleButton } from "@components/common/ToggleButton";
import { nanoid } from "nanoid/non-secure";

let keyExtractorRoot = 0;

function FilterTags(props) {
  const { theme } = useContext(ThemeContext);
  const { tags } = useContext(CoreContext);
  const { searchTags, addSearchTag, removeSearchTag } = useContext(SearchContext);
  const { tagSearchField, setTagSearchField } = useContext(FilterTagsContext);
  const [tagColumns, setTagColumns] = useState([]);
  const [tagsViewContainerSize, setTagsViewContainerSize] = useState({ width: 0, height: 0 });
  const flatListRef = useRef(null);

  const styles = getStyles(theme);
  const filterStyles = getFilterStyles(theme);

  useLayoutEffect(() => {
    setTimeout(() => flatListRef.current.flashScrollIndicators(), 200);
  }, []);

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

    if (groups.length > 1 && groups[groups.length - 1].length === 0) {
      groups.pop();
    }

    // if (groups.length > 1 && groups.length % 2 === 1)
    //   groups.push([])

    keyExtractorRoot = nanoid();
    setTagColumns(groups);
  }, [tagSearchField, tags, tagsViewContainerSize]);

  useLayoutEffect(() => {
    ControlledLayoutAnimation.configureNext({
      update: {
        duration: theme.fadeSpeed,
        type: LayoutAnimation.Types.easeInOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  }, [tagColumns]);

  const NEXT_PAGE_PEEK_WIDTH = 15

  function renderItem({ item, index }) {
    const cardStyle = [styles.tagCard, { width: tagsViewContainerSize.width / 2 - NEXT_PAGE_PEEK_WIDTH}];

    // this is the condition for when whatever the user has entered in the tag search fields brought back no tag matches
    if (tagColumns.length === 1 && tagColumns[0].length === 0) {
      return (
        <View style={cardStyle}>
          <View style={styles.tagRow}>
            <View style={styles.tagButton}>
              <Text style={{ fontSize: theme.fonts.sizes.primary, color: theme.fonts.colors.secondary }}>
                No matches
              </Text>
            </View>
          </View>
        </View>
      );
    }

    const items = [];

    item.forEach((tagItem) => {
      const active = searchTags.includes(tagItem.name);
      const tagNameStyle = [styles.tagName];
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
    keyExtractorRoot = nanoid();
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

  const listFooterComponent = <View style={{width:NEXT_PAGE_PEEK_WIDTH * 2}} />

  return useMemo(() => {
    return (
      <>
        <View style={[filterStyles.outerContainer, styles.outer]}>
          <SectionWithHeader title="Tags" containerStyle={{ padding: 0 }}>
            <View
              style={filterStyles.bodyContainer}
              onLayout={(e) =>
                setTagsViewContainerSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })
              }
            >
              <FlatList
                ref={flatListRef}
                data={tagColumns}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString() + keyExtractorRoot}
                initialNumToRender={3}
                horizontal={true}
                windowSize={3}
                maxToRenderPerBatch={2}
                style={styles.scrollView}
                indicatorStyle={theme.isDark ? "white" : "black"}
                showsHorizontalScrollIndicator={tagColumns.length > 2}
                snapToInterval={tagsViewContainerSize.width / 2 - NEXT_PAGE_PEEK_WIDTH}
                pagingEnabled
                ListFooterComponent={listFooterComponent}
                keyboardDismissMode="on-drag"
                decelerationRate={"fast"}
                getItemLayout={(data, index) => ({
                  length: tagsViewContainerSize.width / 2 - NEXT_PAGE_PEEK_WIDTH,
                  offset: (tagsViewContainerSize.width / 2 - NEXT_PAGE_PEEK_WIDTH) * index,
                  index,
                })}
              />
            </View>
          </SectionWithHeader>
          <SearchInput
            style={[filterStyles.bodyContainer, styles.searchInput, theme.noShadowStyle]}
            returnKeyType="done"
            placeholder={"Search " + tags.length + " tags"}
            onChangeText={onChangeText}
            value={tagSearchField}
          />
        </View>
      </>
    );
  }, [tagColumns, searchTags, theme]);
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
      // marginLeft: theme.rem * 0.75,
      // marginRight: theme.rem * 0.25,
      // paddingRight: theme.rem * 0.5,
      // backgroundColor: "red",
    },
    tagButton: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      // padding: theme.rem * 0.25,
      // paddingHorizontal: theme.rem * 0.5,
      paddingVertical: theme.rem * 0.25,
      borderRadius: theme.pillBorderRadius,
    },
    tagName: {
      color: theme.fonts.colors.title,
      fontSize: theme.fonts.sizes.primary2,
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
      backgroundColor: "rgba(0,0,0,0)",
    },
  });
}
