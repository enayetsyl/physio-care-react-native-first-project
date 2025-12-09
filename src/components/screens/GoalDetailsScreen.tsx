import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../types/navigation";
import { mockGoals } from "../../data/mockGoals";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../ui-atoms/ProgressBar";
import BackButton from "../ui-atoms/BackButton";

type GoalDetailsRouteProp = RouteProp<HomeStackParamList, "GoalDetails">;

export default function GoalDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<GoalDetailsRouteProp>();
  const { goalId } = route.params;

  const goal = mockGoals.find((g) => g.id === goalId);

  if (!goal) {
    return (
      <View style={styles.container}>
        <Text>Goal not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        {/* Goal Info */}
        <View style={styles.section}>
          <Text style={styles.name}>{goal.name}</Text>
          <Text style={styles.type}>{goal.type}</Text>
        </View>

        {/* Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <Text style={styles.progressText}>{goal.progress}% completed</Text>
          <ProgressBar progress={goal.progress} />
        </View>

        {/* Current & Target */}
        {goal.current !== undefined && goal.target !== undefined && (
          <View style={styles.section}>
            <View style={styles.metricRow}>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Current</Text>
                <Text style={styles.metricValue}>
                  {goal.current} {goal.unit || ""}
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Target</Text>
                <Text style={styles.metricValue}>
                  {goal.target} {goal.unit || ""}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Metadata */}
        <View style={styles.section}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Priority:</Text>
            <Text style={styles.metaValue}>{goal.priority}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Status:</Text>
            <Text style={styles.metaValue}>{goal.status}</Text>
          </View>
          {goal.targetDate && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Target Date:</Text>
              <Text style={styles.metaValue}>{goal.targetDate}</Text>
            </View>
          )}
          {goal.lastUpdated && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Last Updated:</Text>
              <Text style={styles.metaValue}>{goal.lastUpdated}</Text>
            </View>
          )}
        </View>

        {/* Latest Achievement */}
        {goal.latestAchievement && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Latest Achievement</Text>
            <Text style={styles.achievementText}>{goal.latestAchievement}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  safeArea: {
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    color: "#007AFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metric: {
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 14,
    color: "#666",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
  achievementText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
