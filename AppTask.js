import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { settaskItems } from "./AppSlice";

import { Button, StyleSheet, Text, View, Alert } from "react-native";
import Task from "./Task";

// ----------------------------TaskList--------------------------------------

function AppTask({ navigation, route }) {
  const taskItems = useSelector((state) => state.todo.taskItems);
  const dispatch = useDispatch();
  // const [taskItems, settaskItems] = useState([]);

  // ---------Show Alert Message function---------
  function showAlertMessage() {
    const date = new Date();
    let copyItems = [...taskItems];
    for (const task of copyItems) {
      if (
        task.date.getDate() === date.getDate() &&
        task.dueTime <= date.getHours() &&
        task.alertShown === false
      ) {
        Alert.alert("Over due task", `${task.task} is over due`, [
          {
            title: "close",
          },
        ]);
        task.alertShown = true;
      }
    }
  }
  setInterval(showAlertMessage, 5000);

  // ----function to Add Task to TaskList ----
  function addTask(task, id, date, dueTime) {
    if (task.length <= 0) {
      Alert.alert("Invaild", "Please enter task", [
        {
          title: "close",
        },
      ]);
    } else {
      dispatch(
        settaskItems([
          ...taskItems,
          {
            task: task,
            id: id,
            date: date,
            dueTime: dueTime,
            startDate: "",
            alertShown: false,
          },
        ])
      );
    }
  }

  // ----function to delete Task from TaskList ----
  function deleteTask(id) {
    let copyItems = [...taskItems];
    dispatch(settaskItems(copyItems.filter((task) => task.id !== id)));
  }

  // ----- function to updateTask ------
  function updateTask(task, id, date) {
    let copyItems = [...taskItems];
    for (const item of copyItems) {
      if (item.id === id) {
        item.task = task;
        item.date = date;
      }
    }
    dispatch(settaskItems(copyItems));
  }

  // ---- function to sort task according to due date -----
  function sortTask(taskItems) {
    let copyItems = [...taskItems];
    copyItems.sort((a, b) => a.date - b.date);
    dispatch(settaskItems(copyItems));
  }

  // ----- function to add date of started task ------
  function startTask(date, id) {
    let copyItems = [...taskItems];
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    for (const item of copyItems) {
      if (item.id === id) {
        item.startDate = formattedDate;
      }
    }
    dispatch(settaskItems(copyItems));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Your Task's</Text>
      </View>
      <View style={styles.newTaskButton}>
        <View>
          <Button
            title=" New task"
            onPress={() => {
              navigation.navigate("AddTask", {
                addTask: addTask,
              });
            }}
          />
        </View>
        <View style={styles.filterButton}>
          <Button title="Filter Task" onPress={() => sortTask(taskItems)} />
        </View>
        <View style={styles.homeScreenButton}>
          <Button
            title="MainScreen"
            onPress={() => {
              // navigation.navigate("TodoApp", {
              //   totalTask: taskItems.length,
              // });
            }}
          />
        </View>
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
                  item.startDate,
                  item.dueTime,
                ]}
              />
              <View style={styles.buttonStyle}>
                <View style={styles.editButton}>
                  <Button
                    title="Edit"
                    onPress={() => {
                      navigation.navigate("EditTask", {
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
    flexDirection: "row",
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
  filterButton: {
    marginLeft: 10,
  },
  homeScreenButton: {
    marginLeft: 10,
  },
});
export default AppTask;
