import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface BackButtonProps {
  onPress: () => void;
  label?: string; // show text label next to icon
  icon?: "arrow" | "chevron";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function BackButton({
  onPress,
  label = "Back",
  icon = "arrow",
  style,
  textStyle,
}: BackButtonProps) {
  const iconSymbol = icon === "chevron" ? "‹" : "←";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, textStyle]}>{iconSymbol}</Text>
      {label ? <Text style={[styles.label, textStyle]}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingRight: 16,
    minHeight: 32,
  },
  icon: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "600",
    marginRight: 4,
  },
  label: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});
