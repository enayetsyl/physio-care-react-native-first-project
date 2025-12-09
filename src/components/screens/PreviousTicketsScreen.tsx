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
import StatusBadge from "../ui-atoms/StatusBadge";
import { getPriorityColor } from "../../utils/statusColors";
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
        <StatusBadge
          status={item.status}
          size="small"
          style={styles.statusBadge}
        />
      </View>

      <View style={styles.ticketMeta}>
        <Text style={styles.ticketCategory}>{item.category}</Text>
        <StatusBadge
          status={item.priority}
          customColor={getPriorityColor(item.priority)}
          size="small"
          style={styles.priorityBadge}
        />
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
    alignSelf: "flex-start",
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
    alignSelf: "flex-start",
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
