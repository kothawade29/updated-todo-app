import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";

import TodoApp from "./TodoApp";
import TaskList from "./TaskList";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, StyleSheet, Text, View } from "react-native";
import {Provider} from 'react-redux'; 
import store from './store';
import MainApp from "./MainApp";
// ------------------------------DRAWER_APP--------------------------------------------


function App() {
  return (
    <Provider store={store}>
    <MainApp/>
    </Provider>
  );
}

export default App;
