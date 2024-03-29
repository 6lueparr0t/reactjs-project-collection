import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

interface Goal {
  id: string;
  text: string;
}

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [courseGoals, setCourseGoals] = useState<
    { text: string; id: string }[]
  >([]);

  function startAddGoalHandler(): void {
    setModalIsVisible(true);
  }

  function endAddGoalHandler(): void {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText: string): void {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: String(enteredGoalText), id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id: string) {
    // console.log("DELETE");
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal: Goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <TouchableOpacity onPress={startAddGoalHandler} style={styles.button}>
          <Text style={styles.text}>Add New Item</Text>
        </TouchableOpacity>
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#0D47A1",
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color:"#fff",
    fontSize:20,
  },
  goalsContainer: {
    flex: 5,
  },
});
