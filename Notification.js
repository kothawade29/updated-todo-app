import React, { Component, useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { settaskItems, setstartTask } from "./AppSlice";

function Notification(props) {
  const taskItems = useSelector((state) => state.todo.taskItems);
  const startTask = useSelector((state) => state.todo.startTask);
  const dispatch = useDispatch();
  // ----------end task-------
  function endTask(startDate) {
    const copyItems = taskItems.map((obj) => {
      if (obj.id === props.text[1]) {
        return { ...obj, startDate: startDate };
      }
      return obj;
    });
    dispatch(settaskItems(copyItems));
  }
  //  -----------timeCounter----------
  const [sec, setsec] = useState(0);
  const [min, setmin] = useState(0);
  const [hr, sethr] = useState(0);
  const [time, settime] = useState("0:0:0");

  useEffect(() => {
    timerCycle();
    return () => {
      settime("0:0:0");
    };
  }, []);

  function timerCycle() {
    if (startTask === true) {
      setsec((sec % 60) + 1);

      if (sec === 60) {
        setmin((min % 60) + 1);
      }
      if (min === 60) {
        sethr(hr + 1);
      }
    }
    settime(`${hr}:${min}:${sec}`);
  }
  setTimeout(timerCycle, 1000);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task {props.text[0]} has started</Text>
      <Text>Time : {time}</Text>
      <Button
        title="End Task"
        onPress={() => {
          dispatch(setstartTask(false));
          endTask("");
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});

export default Notification;
