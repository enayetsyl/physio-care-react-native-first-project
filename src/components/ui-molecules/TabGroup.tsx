import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface TabConfig {
  key: string;
  label: string;
  count?: number;
}

interface TabGroupProps<T extends string> {
  tabs: TabConfig[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  showCounts?: boolean;
}

export default function TabGroup<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  showCounts = false,
}: TabGroupProps<T>) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key as T)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
            {showCounts && tab.count !== undefined ? ` (${tab.count})` : ""}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
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
    textTransform: "capitalize",
  },
  activeTabText: {
    color: "#fff",
  },
});
