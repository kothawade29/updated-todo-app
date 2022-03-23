import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddTask from "./AddTask";
import AppTask from "./AppTask";
import EditTask from "./EditTask";
import Notification from "./Notification";

// ----------------------------TaskList--------------------------------------
const Stack = createNativeStackNavigator();
function TaskList({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="AppTask">
      <Stack.Screen
        name="AppTask"
        component={AppTask}
        options={({ title: "Todo App" }, { headerShown: false })}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={({ title: "Add Tasks" }, { headerShown: false })}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={({ title: "Edit Task" }, { headerShown: false })}
      />
    </Stack.Navigator>
  );
}

export default TaskList;
