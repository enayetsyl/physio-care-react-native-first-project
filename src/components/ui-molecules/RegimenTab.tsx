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
import StatusBadge from "../ui-atoms/StatusBadge";
import ScreenHeader from "../ui-molecules/ScreenHeader";
import TabGroup from "../ui-molecules/TabGroup";
import EmptyState from "../ui-molecules/EmptyState";
import { commonStyles } from "../../styles/common";

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
    <ScrollView
      style={commonStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader title="My Regimen List" paddingTop={50} />

      <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

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
                <StatusBadge
                  status={regimen.status}
                  label={
                    regimen.status === "not-started"
                      ? "Not Started"
                      : regimen.status === "in-progress"
                      ? "In Progress"
                      : "Completed"
                  }
                  size="small"
                  style={styles.statusBadge}
                />
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
          <EmptyState
            title={`No ${
              activeTab === "not-started"
                ? "upcoming"
                : activeTab === "in-progress"
                ? "active"
                : "completed"
            } regimens`}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  progressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
});
