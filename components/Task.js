import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// square,circular são os icones
const Task = (props) => {

    return (
        <>
        <View style={styles.square}></View>
        <View style={styles.circular}></View>
        </>
    )
}
/*
const styles = StyleSheet.create({
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    },
  circular: {
      width: 12,
      height: 12,
      borderColor: '#55BCF6',
      borderWidth: 2,
      borderRadius: 5,
  }
});
*/

export default Task;