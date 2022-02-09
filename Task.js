import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";

function Task(props) {
  return (
    <View style={styles.taskBoxView}>
      <Text style={styles.task}>{props.text[0]}</Text>
      <Text style={styles.dueDate}>Due Date : {props.text[1]}</Text>
      {props.text[2] !== "" ? (
        <Text>Task Start Date : {props.text[2]} </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  taskBoxView: {
    // alignItems:"center",
  },
  task: {
    fontWeight: "bold",
    fontSize: 30,
    marginRight: 20,
  },
  dueDate: {
    fontSize: 15,
  },
});

export default Task;
