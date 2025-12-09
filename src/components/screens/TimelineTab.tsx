import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { mockSessions } from "../../data/mockSessions";
import { Session } from "../../types/session";
import SessionCard from "../ui-molecules/SessionCard";
import AppointmentDetailsSheet from "../ui-molecules/AppointmentDetailsSheet";
import ScreenHeader from "../ui-molecules/ScreenHeader";
import TabGroup from "../ui-molecules/TabGroup";
import { commonStyles } from "../../styles/common";

type TabType = "upcoming" | "completed" | "cancelled";

export default function TimelineTab() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredSessions = useMemo(() => {
    let sessions = mockSessions.filter(
      (session) => session.status === activeTab
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      sessions = sessions.filter(
        (session) =>
          session.consultant.name.toLowerCase().includes(query) ||
          session.type.toLowerCase().includes(query) ||
          session.date.includes(query)
      );
    }

    // Sort by date (most recent first for completed/cancelled, upcoming first for upcoming)
    return sessions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return activeTab === "upcoming" ? dateA - dateB : dateB - dateA;
    });
  }, [activeTab, searchQuery]);

  const handleSessionPress = (session: Session) => {
    setSelectedSession(session);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedSession(null);
  };

  const renderSession = ({ item }: { item: Session }) => (
    <SessionCard session={item} onPress={handleSessionPress} />
  );

  const tabs: { key: TabType; label: string; count: number }[] = [
    {
      key: "upcoming",
      label: "Upcoming",
      count: mockSessions.filter((s) => s.status === "upcoming").length,
    },
    {
      key: "completed",
      label: "Completed",
      count: mockSessions.filter((s) => s.status === "completed").length,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: mockSessions.filter((s) => s.status === "cancelled").length,
    },
  ];

  return (
    <View style={commonStyles.container}>
      <ScreenHeader title="My Appointments" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by consultant, type, or date..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <TabGroup
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showCounts
      />

      {/* Sessions List */}
      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item.id}
        renderItem={renderSession}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {activeTab} appointments found
            </Text>
            {searchQuery && (
              <Text style={styles.emptySubtext}>
                Try adjusting your search terms
              </Text>
            )}
          </View>
        }
      />

      {/* Session Details Modal */}
      <AppointmentDetailsSheet
        visible={showDetails}
        session={selectedSession}
        onClose={handleCloseDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  searchInput: {
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#8E8E93",
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#C7C7CC",
    textAlign: "center",
    marginTop: 8,
  },
});
