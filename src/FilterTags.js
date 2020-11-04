import React, { useContext, useEffect, useLayoutEffect, useRef, useState, memo, useMemo } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, LayoutAnimation, Pressable } from "react-native";
import { CoreContext } from "./shared/react/CoreContext";
import theme from "./Theme";
import { SearchContext } from "./shared/react/SearchContext";
import { filterStyles, FilterHeader } from "./Filter_styles";
import { rgba, darken } from "polished";
import { FilterTagsContext } from "./shared/react/FilterTagsContext";
import { SearchInput, ToggleButton } from "./Common";
import { Dimensions } from "react-native";

function FilterTags(props) {
  const { tags } = useContext(CoreContext);
  const { searchTags, addSearchTag, removeSearchTag } = useContext(SearchContext);
  const { tagSearchField, setTagSearchField } = useContext(FilterTagsContext);
  const [tagColumns, setTagColumns] = useState([]);
  const [tagsViewContainerWidth] = useState(Dimensions.get("window").width - theme.rem);
  const flatListRef = useRef(null);

  useLayoutEffect(() => {
    if (!tags) {
      return;
    }

    let groups = [];
    tags.map((t) => {
      if (groups.length === 0 || groups[groups.length - 1].length === 8) {
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
  }, [tagSearchField, tags]);

  function renderItem({ item, index }) {
    const cardStyle = [styles.tagCard, { width: tagsViewContainerWidth / 2 }];

    const items = [];

    item.forEach((tagItem) => {
      const active = searchTags.includes(tagItem.name);
      const tagCountStyle = [styles.tagCount];
      if (active) {
        tagCountStyle.push(styles.tagCount_selected);
      }

      items.push(
        <View style={styles.tagRow} key={tagItem.name}>
          {/* <Button
            buttonStyle={tagButtonStyle}
            titleStyle={styles.tagName}
            titleProps={{numberOfLines:1}}
            onPress={() => (active ? removeSearchTag(tagItem.name) : addSearchTag(tagItem.name))}
            title={tagItem.name}
            type="solid"
            color={theme.colors.secondary}
            iconRight
            icon={<Text numberOfLines={1} style={tagCountStyle}>{"  " + tagItem.count}</Text>}
          /> */}

          <ToggleButton
            style={styles.tagButton}
            active={active}
            key={items.length}
            onPress={() => (active ? removeSearchTag(tagItem.name) : addSearchTag(tagItem.name))}
          >
            <Text numberOfLines={1} style={styles.tagName}>
              {tagItem.name}
              <Text style={tagCountStyle}>{"  " + tagItem.count}</Text>
            </Text>
          </ToggleButton>
          {/* <Pressable
            onPress={() => (active ? removeSearchTag(tagItem.name) : addSearchTag(tagItem.name))}
            style={tagButtonStyle}
          >
            <Text numberOfLines={1} style={styles.tagName}>
              {tagItem.name}
              <Text style={tagCountStyle}>{"  " + tagItem.count}</Text>
            </Text>
  
          </Pressable> */}
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

  // function onRootViewLayout({ nativeEvent }) {
  //   console.log("A: " + Dimensions.get('window').width + ", B: " + nativeEvent.layout.width)
  //   if (rootViewWidth !== nativeEvent.layout.width) setRootViewWidth(nativeEvent.layout.width - theme.rem);
  // }

  return (
    <>
      <View style={[filterStyles.outerContainer, styles.outer]}>
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
          style={styles.searchInput}
          returnKeyType="done"
          placeholder={"Search " + tags.length + " tags"}
          onChangeText={onChangeText}
          value={tagSearchField}
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
    borderRadius: theme.borderRadius,
  },
  tagName: {
    color: theme.fonts.colors.title,
    fontSize: theme.fonts.sizes.primary,
    fontWeight: theme.fonts.weights.bold,
    // maxWidth: 166,
  },

  tagCount: {
    color: theme.fonts.colors.secondary,
    fontSize: theme.fonts.sizes.mini,
  },
  tagCount_selected: {
    color: theme.fonts.colors.primary,
    // color: darken(0.3, theme.fonts.colors.secondary),
  },
  searchInput: {
    margin: theme.rem * 0.5,
    marginBottom: 0,
  },
});

export default FilterTags;

// function FilterTags() {
//   const { tags } = useContext(CoreContext);
//   const { tagSearchField, setTagSearchField } = useContext(FilterTagsContext);
//   const [tagColumns, setTagColumns] = useState([]);
//   const [test, setTest] = useState([]);
//   const [showActivityIndicator, setShowActivityIndicator] = useState(false);

//   useEffect(() => {
//     if (!tags) {
//       return;
//     }

//     if (tagSearchField.length === 0 && test.length > 0) {
//       return
//     }

//     let groups = [];
//     tags.map((t) => {
//       if (groups.length === 0 || groups[groups.length - 1].length === 10) {
//         groups.push([]);
//       }

//       const currentGroup = groups[groups.length - 1];

//       if (tagSearchField.length === 0) currentGroup.push(t);
//       else if (t.name.toLowerCase().startsWith(tagSearchField.toLowerCase())) currentGroup.push(t);
//       return null;
//     });

//     if (groups.length > 0 && groups[groups.length - 1].length === 0) {
//       groups.pop();
//     }

//     let viewGroups = [];
//     groups.forEach((group) => {
//       viewGroups.push(
//         <View style={styles.tagCard}>
//           {group.map((tagItem) => (
//             <View style={styles.tagItem} key={tagItem.name}>
//               <Text style={styles.tagName}>{tagItem.name}</Text>
//               <Text style={styles.tagCount}>{tagItem.count}</Text>
//             </View>
//           ))}
//         </View>
//       );
//     });

//     setTagColumns(viewGroups);
//     if (test.length === 0) {
//       setTest(viewGroups)
//     }
//     setShowActivityIndicator(false);
//   }, [tagSearchField, tags]);

//   // function renderItem({ item, index }) {
//   //   const cardStyle = index === 0 ? [styles.tagCard, styles.tagCardFirst] : styles.tagCard;

//   //   return (
//   //     <View style={cardStyle}>
//   //       {item.map((tagItem) => (
//   //         <View style={styles.tagItem} key={tagItem.name}>
//   //           <Text style={styles.tagName}>{tagItem.name}</Text>
//   //           <Text style={styles.tagCount}>{tagItem.count}</Text>
//   //         </View>
//   //       ))}
//   //     </View>
//   //   );
//   // }

//   function onChangeText(text) {
//     setShowActivityIndicator(true);
//     setTagSearchField(text);
//   }

//   const fullTagView = (
//     <ScrollView
//     keyExtractor={(item, index) => index.toString()}
//     horizontal={true}
//     style={styles.scrollView}
//     indicatorStyle="white"
//   >
//     {test}
//   </ScrollView>
//   )

//   const tagScrollView = (
//     <ScrollView
//       keyExtractor={(item, index) => index.toString()}
//       horizontal={true}
//       style={styles.scrollView}
//       indicatorStyle="white"
//     >
//       {tagColumns}
//     </ScrollView>
//   );

//   const scrollViewToUse = tagSearchField.length === 0 ? fullTagView : tagScrollView

//   const noMatchesText = (
//     <Text style={{ marginLeft: theme.rem, marginTop: theme.rem * 0.5, color: theme.fonts.colors.secondary }}>
//       No Matches
//     </Text>
//   );

//   return (
//     <>
//       <View style={[filterStyles.outerContainer, styles.outer]}>
//         <FilterHeader title={"Tags"} />
//         {tagColumns.length > 0 ? <View style={styles.body}>{scrollViewToUse}</View> : noMatchesText}
//         <SearchInput
//           style={styles.searchInput}
//           returnKeyType="done"
//           placeholder={"Search " + tags.length + " tags"}
//           onChangeText={onChangeText}
//         />
//       </View>
//     </>
//   );
// }
