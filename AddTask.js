import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Alert,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "@react-native-community/datetimepicker";
// ----------------------ADD NEW TASK-------------------------

function AddTask({ route, navigation }) {
  const { addTask } = route.params;
  const [task, setTask] = useState("");
  const id = uuidv4();

  // ------------DateTimePickerCode------------------------------------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  // ------------DateTimePickerCodeEnds------------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Today's Task</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInputButton}
          value={task}
          placeholder="Add task"
          onChangeText={(text) => setTask(text)}
        />

        <View style={styles.dueDateButton}>
          <View style={styles.addTimeButton}>
            <Button onPress={showTimepicker} title="Add time" />
          </View>
          <View>
            <Button onPress={showDatepicker} title="Add Due Date" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <Button
          title="add task"
          onPress={() => {
            addTask(
              task,
              id,
              `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
              date.getHours()
            );
            setTask(null);
            Keyboard.dismiss();
            navigation.goBack();
          }}
        />
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
  inputView: {
    alignItems: "center",
    justifyContent: "center",
  },
  textInputButton: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dueDateButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "row",
  },
  addTimeButton: {
    marginRight: 10,
  },
});

export default AddTask;
