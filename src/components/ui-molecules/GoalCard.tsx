import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProgressBar from "../ui-atoms/ProgressBar";
import { Goal } from "../../types/goal";

interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
}

export default function GoalCard({ goal, onPress }: GoalCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{goal.name}</Text>
        <Text style={styles.duration}>{goal.duration}</Text>
      </View>

      <View style={styles.meta}>
        <Text style={styles.type}>{goal.type}</Text>
        <Text style={styles.progress}>{goal.progress}%</Text>
      </View>

      <ProgressBar progress={goal.progress} height={8} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  type: {
    fontSize: 14,
    color: "#007AFF",
  },
  progress: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
