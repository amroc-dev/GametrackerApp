import React, { useContext, useEffect, useState, memo } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from "react-native";
import { CoreContext } from "./shared/react/CoreContext";
import { SearchContext } from "./shared/react/SearchContext";
import { SearchResultsContext } from "./shared/react/SearchResultsContext";
import theme from "./Theme";
import { filterStyles, FilterHeader } from "./Filter_styles";
import { SearchBar } from "react-native-elements";
import { rgba } from "polished";

function FilterTags() {
  const { tags } = useContext(CoreContext);
  const [tagColumns, setTagColumns] = useState([]);

  // useEffect(() => {
  //   if (!tags) return;

  //   let groups = [];
  //   groups.push([]);

  //   for (let i = 0; i < tags.length; i++) {
  //     groups[groups.length - 1].push(
  //       <Text style={styles.tagItem} key={i}>
  //         {tags[i].name}
  //       </Text>
  //     );
  //     if (groups[groups.length - 1].length == 10) {
  //       groups.push([]);
  //     }
  //   }

  //   let columns = [];

  //   groups.forEach((g, i) => {
  //     columns.push(
  //       <View style={styles.tagColumn} key={i}>
  //         {g}
  //       </View>
  //     );
  //   });

  //   setTagColumns(columns);
  // }, [tags]);

  useEffect(() => {
    if (!tags) return;

    let groups = [];
    groups.push([]);

    for (let i = 0; i < tags.length; i++) {
      groups[groups.length - 1].push(tags[i]);
      if (groups[groups.length - 1].length == 8) {
        // break;
        groups.push([]);
      }
    }
    setTagColumns(groups);
  }, [tags]);

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

    return <CardItem doc={item}></CardItem>;
  }

  return (
    <>
      <View style={[filterStyles.outerContainer, styles.outer]}>
        <FilterHeader title={"Tags"} />
        <FlatList
          data={tagColumns}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={5}
          horizontal={true}
          windowSize={100}
          // pagingEnabled={true}
          updateCellsBatchingPeriod={1}
          // maxToRenderPerBatch={1000}
          // removeClippedSubviews={false}
          style={styles.scrollView}
          indicatorStyle='white'
        />
        <SearchBar
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          platform="ios"
          placeholder="Search for tag"

          // onChangeText={}
          // onSubmitEditing={}
          // onClear={}
          cancelButtonProps={{
            color: theme.fonts.colors.title,
          }}
          // value={}
          // returnKeyType={"search"}
        />
        {/* <View style={[filterStyles.bodyContainer, styles.body]}>
          <View style={styles.innerBody}>


            <SearchBar
              containerStyle={styles.searchBar}
              inputContainerStyle={styles.textInput}
              inputStyle={styles.input}
              platform="ios"
              placeholder="Search for tag"
              // onChangeText={}
              // onSubmitEditing={}
              // onClear={}
              cancelButtonProps={{
                color: theme.fonts.colors.title,
              }}
              // value={}
              // returnKeyType={"search"}
            />
          </View>
        </View> */}
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
  },

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
    marginRight: theme.rem * 0.5,
    minWidth: 10,
    backgroundColor: theme.colors.background2,
    borderRadius: theme.borderRadius,
    padding: theme.rem * 0.5,
    // minWidth: 198.5,
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

  searchBarContainer: {
    alignSelf: "flex-end",
    height: theme.rowHeight + theme.rem, // * 0.5
    backgroundColor: rgba(0, 0, 0, 0),
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
  },
  searchInputContainer: {
    height: theme.rowHeight,
    backgroundColor: "white",
    borderRadius: theme.borderRadius,
  },
  searchInput: {},
});

export default memo(FilterTags);
