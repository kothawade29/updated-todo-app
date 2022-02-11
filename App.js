import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";

import TodoApp from "./TodoApp";
import TaskList from "./TaskList";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, StyleSheet, Text, View } from "react-native";
// ------------------------------DRAWER_APP--------------------------------------------
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="TaskList">
        <Drawer.Screen name="TaskList" component={TaskList} />
        <Drawer.Screen name="TodoApp" component={TodoApp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
