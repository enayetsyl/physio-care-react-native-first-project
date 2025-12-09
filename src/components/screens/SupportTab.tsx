import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { SupportStackNavigationProp } from "../../types/navigation";
import { mockCenters, mockConsultants } from "../../data/mockAppointments";
import { commonStyles } from "../../styles/common";

export default function SupportTab() {
  const { user } = useAuth();
  const navigation = useNavigation<SupportStackNavigationProp>();

  const userName = user?.name?.split(" ")[0] || "there";

  const handleActionPress = (actionType: "chat" | "video" | "tickets") => {
    switch (actionType) {
      case "chat":
        navigation.navigate("Chat");
        break;
      case "video":
        navigation.navigate("VideoConsultation", {
          center: mockCenters[0],
          consultant: mockConsultants[0],
          sessionType: "online",
        });
        break;
      case "tickets":
        navigation.navigate("PreviousTickets");
        break;
    }
  };

  return (
    <ScrollView style={commonStyles.containerLight}>
      <View style={styles.header}>
        <Text style={styles.greeting}>How can we help you, {userName}?</Text>
        <Text style={styles.subtitle}>
          We're here to support your physiotherapy journey
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionCard, styles.chatCard]}
          onPress={() => handleActionPress("chat")}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>💬</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Chat with Us</Text>
            <Text style={styles.actionDescription}>
              Get instant help from our support team
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.videoCard]}
          onPress={() => handleActionPress("video")}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>📹</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Video Consultation</Text>
            <Text style={styles.actionDescription}>
              Connect with a physiotherapist virtually
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.ticketsCard]}
          onPress={() => handleActionPress("tickets")}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>📋</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Previous Tickets</Text>
            <Text style={styles.actionDescription}>
              View your support history and previous queries
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  actionsContainer: {
    padding: 16,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  videoCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#34C759",
  },
  ticketsCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
