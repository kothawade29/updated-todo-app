import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import React from "react";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, StyleSheet, Text, View } from "react-native";
// -------------------------------------------------------

function TodoApp({navigation,route}) {
    return (
      <View>
        <Text>
          Display number of task here
        </Text>
      </View>
    );
  }

  export default TodoApp;