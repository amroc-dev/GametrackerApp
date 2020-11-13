import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import theme from "./Theme";

export function Thumb() {
  const THUMB_RADIUS = 16;
  
  return (
    <View
      style={{
        width: THUMB_RADIUS * 2,
        height: THUMB_RADIUS * 2,
        borderRadius: THUMB_RADIUS,
        borderWidth: 0,
        borderColor: "#7f7f7f",
        backgroundColor: "#ffffff",
      }}
    />
  );
}

export function RailSelected() {
  return (
    <View
      style={{
        height: 4,
        backgroundColor: "#4499ff",
        borderRadius: 2,
      }}
    />
  );
}

export function Rail() {
  return (
    <View
      style={{
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#7f7f7f",
      }}
    />
  );
}

export function Notch(props) {
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "#4499ff",
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
      }}
      {...props}
    />
  );
}

export function Label({ text, ...restProps }) {
  return (
    <View
      style={{
        alignItems: "center",
        padding: 8,
        backgroundColor: "#4499ff",
        borderRadius: 4,
      }}
      {...restProps}
    >
      <Text
        style={{
          fontSize: 16,
          color: "#fff",
        }}
      >
        {text}
      </Text>
    </View>
  );
}