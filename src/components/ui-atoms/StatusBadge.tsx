import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { getStatusColor } from "../../utils/statusColors";

interface StatusBadgeProps {
  status: string;
  customColor?: string;
  size?: "small" | "medium";
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function StatusBadge({
  status,
  customColor,
  size = "medium",
  label,
  style,
  textStyle,
}: StatusBadgeProps) {
  const color = customColor || getStatusColor(status);
  const fontSize = size === "small" ? 10 : 12;
  const padding = size === "small" ? 6 : 8;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color, paddingHorizontal: padding },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize }, textStyle]}>
        {label || status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
