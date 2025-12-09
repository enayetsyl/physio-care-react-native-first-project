import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { mockClinicalRecords } from "../../data/mockClinicalRecords";
import { ProfileStackNavigationProp } from "../../types/navigation";
import ScreenHeader from "../ui-molecules/ScreenHeader";
import { commonStyles } from "../../styles/common";

export default function ClinicalRecordsScreen() {
  const navigation = useNavigation<ProfileStackNavigationProp>();

  const handleRecordPress = (record: any) => {
    // For now, just show an alert with details
    alert(
      `Clinical Record Details:\n\n${record.visitSummary}\n\nConsultant: ${record.consultantName}\nCenter: ${record.centerName}\nDate: ${record.date}\n\nTreatment Plan: ${record.treatmentPlan}\n\nFeedback: ${record.clinicalFeedback}`
    );
  };

  return (
    <ScrollView
      style={commonStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader
        title="Clinical Records"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backButtonProps={{ icon: "chevron", label: "" }}
        paddingTop={40}
      />

      <View style={styles.recordsList}>
        {mockClinicalRecords.map((record) => (
          <TouchableOpacity
            key={record.id}
            style={styles.recordCard}
            onPress={() => handleRecordPress(record)}
          >
            <View style={styles.recordHeader}>
              <Text style={styles.visitSummary}>{record.visitSummary}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      record.status === "completed" ? "#34C759" : "#FF9500",
                  },
                ]}
              >
                <Text style={styles.statusText}>{record.status}</Text>
              </View>
            </View>

            <Text style={styles.consultant}>{record.consultantName}</Text>
            <Text style={styles.center}>{record.centerName}</Text>
            <Text style={styles.date}>
              {new Date(record.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>

            <Text style={styles.treatmentLabel}>Treatment Plan:</Text>
            <Text style={styles.treatmentText}>{record.treatmentPlan}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  recordsList: {
    padding: 20,
  },
  recordCard: {
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
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  visitSummary: {
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
    textTransform: "capitalize",
  },
  consultant: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
    marginBottom: 4,
  },
  center: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 12,
  },
  treatmentLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  treatmentText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
