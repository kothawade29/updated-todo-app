import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import Task from "./Task";
// ----------------------------TaskList--------------------------------------

function AppTask({ navigation }) {
  const [taskItems, settaskItems] = useState([]);
  function addTask(task, id, date) {
    settaskItems([...taskItems, { task: task, id: id, date: date }]);
  }
  function deleteTask(id) {
    let copyItems = [...taskItems];
    settaskItems(copyItems.filter((task) => task.id !== id));
  }

  function updateTask(task, id, date) {
    let copyItems = [...taskItems];
    for (const item of taskItems) {
      if (item.id === id) {
        item.task = task;
        item.date = date;
      }
    }
    settaskItems(copyItems);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Your Task's</Text>
      </View>

      <View style={styles.newTaskButton}>
        <Button
          title=" New task"
          onPress={() => {
            navigation.navigate("AddTask", {
              addTask: addTask,
            });
          }}
        />
      </View>

      <View style={styles.displayView}>
        {taskItems.map((item) => {
          return (
            <View style={styles.box}>
              <Task
                key={item.id}
                text={[
                  item.task,
                  `${item.date.getDate()}/${
                    item.date.getMonth() + 1
                  }/${item.date.getFullYear()}`,
                ]}
              />
              <View style={styles.buttonStyle}>
                <View style={styles.editButton}>
                  <Button
                    title="Edit"
                    onPress={() => {
                      navigation.navigate("EditTask", {
                        updateTask: updateTask,
                        task: item.task,
                        id: item.id,
                        Ddate: item.date,
                      });
                    }}
                  />
                </View>
                <View style={styles.deleteButton}>
                  <Button
                    title="Delete"
                    onPress={() => {
                      deleteTask(item.id);
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}
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
  newTaskButton: {
    alignItems: "center",
    justifyContent: "center",
    // flexDirection:'row',
  },
  myTasksButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  displayView: {
    margin: 20,
  },
  box: {
    // flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 10,
  },
  buttonStyle: {
    flexDirection: "row",
  },
  editButton: {
    margin: 10,
  },
  deleteButton: {
    marginTop: 10,
  },
});
export default AppTask;
