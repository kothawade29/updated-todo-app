import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { settaskItems, setstartTask } from "./AppSlice";

import { Button, StyleSheet, Text, View, Alert } from "react-native";
import Task from "./Task";
// ----------------------------TaskList--------------------------------------

function AppTask({ navigation, route }) {
  const taskItems = useSelector((state) => state.todo.taskItems);
  const isTaskStarted = useSelector((state) => state.todo.startTask);
  const dispatch = useDispatch();

  // ---------Show Alert Message function---------
  // function showAlertMessage() {
  //   const todayDate = new Date();
  //   const copyItems = taskItems.map((task) => {
  //     if (
  //       task.alertShown === false &&
  //       task.date ===
  //         `${todayDate.getDate()}/${
  //           todayDate.getMonth() + 1
  //         }/${todayDate.getFullYear()}` &&
  //       task.dueTime <= todayDate.getHours()
  //     ) {
  //       Alert.alert("Over due task", `${task.task} is over due`, [
  //       {
  //         title: "close",
  //       },
  //     ]);
  //     dispatch(settaskItems(copyItems));
  //       return { ...task, alertShown: true };
  //     }
  //   });
  //   // console.log(copyItems);
  //   // dispatch(settaskItems(copyItems));
  // }
  // setInterval(showAlertMessage, 5000);
  // ----------------------------------

  // ----function to delete Task from TaskList ----
  function deleteTask(id) {
    let copyItems = [...taskItems];
    dispatch(settaskItems(copyItems.filter((task) => task.id !== id)));
  }

  // ---- function to sort task according to due date -----
  function sortTask(taskItems) {
    let copyItems = [...taskItems];
    copyItems.sort((a, b) => a.date - b.date);
    dispatch(settaskItems(copyItems));
  }
  // ---------------------------------------
  // ------------------------------------------

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
              navigation.navigate("AddTask");
            }}
          />
        </View>
        <View style={styles.filterButton}>
          <Button title="Filter Task" onPress={() => sortTask(taskItems)} />
        </View>
      </View>

      <View style={styles.displayView}>
        {taskItems.map((item) => {
          return (
            <View style={styles.box} key={item.id}>
              <Task
                text={[item.task, item.date, item.startDate, item.dueTime]}
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
  startTaskButton: {
    marginTop: 10,
  },
});
export default AppTask;
