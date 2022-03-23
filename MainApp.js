import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";

import TodoApp from "./TodoApp";
import TaskList from "./TaskList";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, StyleSheet, Text, View } from "react-native";
// import {Provider} from 'react-redux';
// import { store } from "./Redux/store";
import Notification from "./Notification";
import { useSelector } from "react-redux";
// ------------------------------DRAWER_APP--------------------------------------------
const Drawer = createDrawerNavigator();

function MainApp() {
  const taskItems = useSelector((state) => state.todo.taskItems);
  const isTaskStarted = useSelector((state) => state.todo.startTask);
  const startedTask = useSelector((state) => state.todo.startedTask);
  const startedTaskId = useSelector((state) => state.todo.startedTaskId);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="TaskList">
        <Drawer.Screen name="TaskList" component={TaskList} />
        <Drawer.Screen name="TodoApp" component={TodoApp} />
      </Drawer.Navigator>
      {isTaskStarted === true && startedTask !== "" && startedTaskId !== 0 ? (
        <Notification text={[startedTask, startedTaskId]} />
      ) : null}
    </NavigationContainer>
  );
}

export default MainApp;
