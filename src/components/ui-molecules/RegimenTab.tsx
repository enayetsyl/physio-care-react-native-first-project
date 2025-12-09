import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { mockRegimens } from "../../data/mockRegimen";
import { Regimen, RegimenTabType } from "../../types/regimen";
import ProgressBar from "../ui-atoms/ProgressBar";
import ScreenHeader from "../ui-molecules/ScreenHeader";

export default function RegimenTab() {
  const [activeTab, setActiveTab] = useState<RegimenTabType>("in-progress");

  const filteredRegimens = mockRegimens.filter(
    (regimen) => regimen.status === activeTab
  );

  const handleRegimenPress = (regimen: Regimen) => {
    // For now, show details in an alert
    const exercises = regimen.exercises
      .map(
        (ex) =>
          `${ex.name}: ${ex.sets} sets × ${ex.reps} reps${
            ex.weight ? ` @ ${ex.weight}kg` : ""
          }`
      )
      .join("\n");

    alert(
      `Regimen Details: ${regimen.name}\n\nProgress: ${regimen.completedExercises}/${regimen.totalExercises} exercises\n\nExercises:\n${exercises}`
    );
  };

  const tabs = [
    { key: "not-started", label: "Not Started" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="My Regimen List" paddingTop={50} />

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as RegimenTabType)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Regimen List */}
      <View style={styles.regimenList}>
        {filteredRegimens.length > 0 ? (
          filteredRegimens.map((regimen) => (
            <TouchableOpacity
              key={regimen.id}
              style={styles.regimenCard}
              onPress={() => handleRegimenPress(regimen)}
            >
              <View style={styles.regimenHeader}>
                <Text style={styles.regimenName}>{regimen.name}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        regimen.status === "completed"
                          ? "#34C759"
                          : regimen.status === "in-progress"
                          ? "#FF9500"
                          : "#8E8E93",
                    },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {regimen.status === "not-started"
                      ? "Not Started"
                      : regimen.status === "in-progress"
                      ? "In Progress"
                      : "Completed"}
                  </Text>
                </View>
              </View>

              <Text style={styles.progressText}>
                {regimen.completedExercises} of {regimen.totalExercises}{" "}
                exercises completed
              </Text>

              <ProgressBar
                progress={
                  (regimen.completedExercises / regimen.totalExercises) * 100
                }
                height={6}
              />

              {regimen.startDate && regimen.endDate && (
                <Text style={styles.dateText}>
                  {new Date(regimen.startDate).toLocaleDateString()} -{" "}
                  {new Date(regimen.endDate).toLocaleDateString()}
                </Text>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No{" "}
              {activeTab === "not-started"
                ? "upcoming"
                : activeTab === "in-progress"
                ? "active"
                : "completed"}{" "}
              regimens
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  activeTab: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },
  regimenList: {
    paddingHorizontal: 20,
  },
  regimenCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  regimenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  regimenName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999",
  },
});
