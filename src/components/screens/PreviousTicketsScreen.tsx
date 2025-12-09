import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { mockSupportTickets } from "../../data/mockSupport";
import { SupportTicket } from "../../types/support";
import { SupportStackNavigationProp } from "../../types/navigation";
import ScreenHeader from "../ui-molecules/ScreenHeader";
import { commonStyles } from "../../styles/common";

export default function PreviousTicketsScreen() {
  const navigation = useNavigation<SupportStackNavigationProp>();

  const handleTicketPress = (ticket: SupportTicket) => {
    Alert.alert(
      ticket.title,
      `Status: ${
        ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)
      }\nCategory: ${ticket.category}\nPriority: ${ticket.priority}`,
      [{ text: "OK" }]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "#34C759";
      case "closed":
        return "#8E8E93";
      case "pending":
        return "#FF9500";
      default:
        return "#8E8E93";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#FF3B30";
      case "medium":
        return "#FF9500";
      case "low":
        return "#34C759";
      default:
        return "#8E8E93";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderTicket = ({ item }: { item: SupportTicket }) => (
    <TouchableOpacity
      style={styles.ticketItem}
      onPress={() => handleTicketPress(item)}
    >
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>{item.title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.ticketMeta}>
        <Text style={styles.ticketCategory}>{item.category}</Text>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(item.priority) },
          ]}
        >
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>

      <View style={styles.ticketFooter}>
        <Text style={styles.ticketDate}>
          Created: {formatDate(item.createdAt)}
        </Text>
        <Text style={styles.ticketDate}>
          Updated: {formatDate(item.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.containerLight}>
      <ScreenHeader
        title="Previous Tickets"
        showBackButton
        onBackPress={() => navigation.goBack()}
        backButtonProps={{ label: "" }}
      />

      <FlatList
        data={mockSupportTickets}
        keyExtractor={(item) => item.id}
        renderItem={renderTicket}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No previous tickets found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  ticketItem: {
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
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
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
  ticketMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ticketCategory: {
    fontSize: 14,
    color: "#666",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ticketDate: {
    fontSize: 12,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
