import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
// -------------------------Edit Task---------------------------------------

function EditTask({ navigation, route }) {
  const { updateTask, task, id, Ddate } = route.params;
  const [Task, setTask] = useState(task);
  // --------------DatePickerCode--------------------------
  const [date, setDate] = useState(Ddate);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  // ---------------------DatePickerCodeEnds-------------------

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Edit Task</Text>
      </View>
      <View style={styles.updateTextInput}>
        <TextInput
          value={Task}
          style={styles.textInputButton}
          placeholder="Add task"
          onChangeText={(text) => setTask(text)}
        />
        <View style={styles.updateDateButton}>
          <View>
            <Button onPress={showDatepicker} title="Update Date" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <Button
          title="Update Task"
          onPress={() => {
            updateTask(Task, id, date);
            setTask(null);
            Keyboard.dismiss();
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
  textInputButton: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  updateTextInput: {
    alignItems: "center",
  },
  updateDateButton: {
    marginBottom: 10,
  },
});

export default EditTask;
