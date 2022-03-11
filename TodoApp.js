import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSelector , useDispatch } from "react-redux";


import { Button, StyleSheet, Text, View } from "react-native";
// -------------------------------------------------------

function TodoApp({ navigation, route }) {
  // const { totalTask } = route.params;
  const taskItems=useSelector(state=>state.todo.taskItems);
  const totalTask=taskItems.length;
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Total Pending Task {totalTask}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerView: {
    padding: 40,
    alignItems: "center",
  },
  headerText: {
    color: "green",
    fontSize: 30,
    fontWeight: "bold",
  },
});
export default TodoApp;
