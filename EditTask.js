import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  settaskItems,
  setstartTask,
  setstartedTask,
  setstartedTaskId,
} from "./AppSlice";
import DateTimePicker from "@react-native-community/datetimepicker";

// -------------------------Edit Task---------------------------------------

function EditTask({ navigation, route }) {
  const { task, id, Ddate } = route.params;
  const [updatedTask, setupdatedTask] = useState(task);
  const taskItems = useSelector((state) => state.todo.taskItems);
  const isTaskStarted = useSelector((state) => state.todo.startTask);
  const dispatch = useDispatch();

  // --------------------------------------------------------

  function updateTask(task, id, date) {
    const copyItems = taskItems.map((taskObj) => {
      if (taskObj.id === id) {
        return { ...taskObj, task: task, date: date };
      }
      return taskObj;
    });
    dispatch(settaskItems(copyItems));
  }

  function startTask(startDate, id) {
    if (isTaskStarted === false) {
      const copyItems = taskItems.map((obj) => {
        if (obj.id === id) {
          return { ...obj, startDate: startDate };
        }
        return obj;
      });
      dispatch(setstartTask(true));
      dispatch(settaskItems(copyItems));
      dispatch(setstartedTask(updatedTask));
      dispatch(setstartedTaskId(id));
    } else {
      Alert.alert("Error", "Some other task is already started", [
        {
          title: "close",
        },
      ]);
    }
  }

  // --------------DatePickerCode--------------------------
  const [date, setDate] = useState(new Date());
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
          value={updatedTask}
          style={styles.textInputButton}
          placeholder="Add task"
          onChangeText={(text) => setupdatedTask(text)}
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

        <View style={styles.taskFunction}>
          <View>
            <Button
              title="Update Task"
              onPress={() => {
                updateTask(
                  updatedTask,
                  id,
                  `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`
                );
                setupdatedTask(null);
                Keyboard.dismiss();
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.startTask}>
            <Button
              title="Start Task"
              onPress={() => {
                startTask(
                  `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`,
                  id
                );
                navigation.goBack();
              }}
            />
          </View>
        </View>
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
  taskFunction: {
    flexDirection: "row",
  },
  startTask: {
    marginLeft: 10,
  },
});

export default EditTask;
