import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import StatusBadge from "../ui-atoms/StatusBadge";
import { Session } from "../../types/session";

interface AppointmentDetailsSheetProps {
  visible: boolean;
  session: Session | null;
  onClose: () => void;
}

export default function AppointmentDetailsSheet({
  visible,
  session,
  onClose,
}: AppointmentDetailsSheetProps) {
  if (!session) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderExercise = ({ item }: { item: any }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <View style={styles.exerciseDetails}>
        {item.weight && (
          <Text style={styles.exerciseDetail}>{item.weight}</Text>
        )}
        {item.sets && item.reps && (
          <Text style={styles.exerciseDetail}>
            {item.sets} sets × {item.reps} reps
          </Text>
        )}
        {item.duration && (
          <Text style={styles.exerciseDetail}>{item.duration}</Text>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Session Details</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Consultant</Text>
            <Text style={styles.consultantName}>{session.consultant.name}</Text>
            <Text style={styles.consultantSpecialty}>
              {session.consultant.specialty}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Session Info</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date:</Text>
              <Text style={styles.infoValue}>{formatDate(session.date)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Time:</Text>
              <Text style={styles.infoValue}>{session.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duration:</Text>
              <Text style={styles.infoValue}>{session.duration}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type:</Text>
              <Text style={styles.infoValue}>{session.type}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <StatusBadge
                status={session.status}
                size="small"
                style={styles.statusBadge}
              />
            </View>
          </View>

          {session.center && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Center</Text>
              <Text style={styles.centerName}>{session.center.name}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Exercises ({session.completedExercises}/{session.totalExercises})
            </Text>
            <FlatList
              data={session.exercises}
              keyExtractor={(item) => item.id}
              renderItem={renderExercise}
              scrollEnabled={false}
            />
          </View>

          {session.notes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.notes}>{session.notes}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  consultantName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  consultantSpecialty: {
    fontSize: 14,
    color: "#8E8E93",
  },
  centerName: {
    fontSize: 16,
    color: "#1C1C1E",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#8E8E93",
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: "#1C1C1E",
    flex: 1,
  },
  statusBadge: {
    alignSelf: "flex-start",
  },
  exerciseItem: {
    backgroundColor: "#F2F2F7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  exerciseDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  exerciseDetail: {
    fontSize: 12,
    color: "#8E8E93",
    marginRight: 12,
    marginBottom: 2,
  },
  notes: {
    fontSize: 14,
    color: "#1C1C1E",
    lineHeight: 20,
  },
});
