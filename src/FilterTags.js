import React, { useContext, useEffect, useLayoutEffect, useRef, useState, memo } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, LayoutAnimation } from "react-native";
import { CoreContext } from "./shared/react/CoreContext";
import theme from "./Theme";
import { filterStyles, FilterHeader } from "./Filter_styles";
import { rgba } from "polished";
import { FilterTagsContext } from "./shared/react/FilterTagsContext";
import { SearchInput } from "./Common";

function FilterTags(props) {
  const { tags } = useContext(CoreContext);
  const { tagSearchField, setTagSearchField } = useContext(FilterTagsContext);
  const [tagColumns, setTagColumns] = useState([]);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [rootViewWidth, setRootViewWidth] = useState(0);
  const flatListRef = useRef(null)

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
    setTagColumns(groups);
    setShowActivityIndicator(false);

  }, [tagSearchField, tags]);

  function renderItem({ item, index }) {
    const cardStyle = [styles.tagCard, { width: rootViewWidth / 2 }];

    return (
      <View style={cardStyle}>
        {item.map((tagItem) => (
          <View style={styles.tagItem} key={tagItem.name}>
            <Text numberOfLines={1} style={styles.tagName}>
              {tagItem.name}
            </Text>
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

  useEffect( () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset:0, animated:false});
    }
  }, [tagColumns])

  const tagFlatList = (
      <FlatList
        ref={flatListRef}
        data={tagColumns}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        horizontal={true}
        windowSize={100}
        updateCellsBatchingPeriod={5}
        style={styles.scrollView}
        indicatorStyle="white"
        pagingEnabled={true}
        persistentScrollbar={true}
        keyboardDismissMode="on-drag"
        getItemLayout={(data, index) => (
          {length: 200, offset: rootViewWidth * index, index}
        )}
      />
  );

  const noMatchesText = (
    <Text style={{ marginLeft: theme.rem, marginTop: theme.rem * 0.5, color: theme.fonts.colors.secondary }}>
      No Matches
    </Text>
  );

  function onRootViewLayout({ nativeEvent }) {
    if (rootViewWidth !== nativeEvent.layout.width) setRootViewWidth(nativeEvent.layout.width - theme.rem);
  }

  return (
    <>
      <View onLayout={onRootViewLayout} style={[filterStyles.outerContainer, styles.outer]}>
        <FilterHeader title={"Tags"} />
        {tagColumns.length > 0 ? <View style={styles.body}>{tagFlatList}</View> : noMatchesText}
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
    // minWidth: 160,
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
    fontWeight: theme.fonts.weights.bold,
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
