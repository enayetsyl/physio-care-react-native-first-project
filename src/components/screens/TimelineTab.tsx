import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { mockSessions } from "../../data/mockSessions";
import { Session } from "../../types/session";
import SessionCard from "../ui-molecules/SessionCard";
import AppointmentDetailsSheet from "../ui-molecules/AppointmentDetailsSheet";
import ScreenHeader from "../ui-molecules/ScreenHeader";
import TabGroup from "../ui-molecules/TabGroup";
import EmptyState from "../ui-molecules/EmptyState";
import { commonStyles } from "../../styles/common";
import SearchInput from "../ui-atoms/SearchInput";

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
        <SearchInput
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
          <EmptyState
            title={`No ${activeTab} appointments found`}
            subtitle={
              searchQuery ? "Try adjusting your search terms" : undefined
            }
            style={styles.emptyContainer}
          />
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
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    paddingTop: 100,
  },
});
