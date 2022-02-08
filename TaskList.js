import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import React , {useState} from "react";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";

import AddTask from "./AddTask";
import AppTask from "./AppTask";
import EditTask from './EditTask';
// ----------------------------TaskList--------------------------------------
  const Stack=createNativeStackNavigator();
  function TaskList() {
    return (
        <Stack.Navigator initialRouteName="AppTask">
          <Stack.Screen
            name="AppTask"
            component={AppTask}
            options={{ title: "Todo App" },{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTask}
            options={{ title: "Add Tasks" }}
          />
          <Stack.Screen
            name="EditTask"
            component={EditTask}
            options={{ title: "Edit Task" }}
          />
        </Stack.Navigator>
    );
  }
  
export default TaskList;