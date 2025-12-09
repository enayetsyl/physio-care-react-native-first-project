import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface AvatarProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  maxInitials?: number; // limit initials to 1 or 2
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const getInitials = (name: string, maxInitials: number) => {
  const safeName = name?.trim() ?? "";
  if (!safeName) return "U";

  const parts = safeName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";

  const initials = parts
    .slice(0, maxInitials)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, maxInitials);

  return initials || "U";
};

export default function Avatar({
  name,
  size = 44,
  backgroundColor = "#007AFF",
  textColor = "#fff",
  maxInitials = 2,
  style,
  textStyle,
}: AvatarProps) {
  const initials = getInitials(name, Math.max(1, Math.min(maxInitials, 2)));

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size * 0.36,
            color: textColor,
          },
          textStyle,
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
  },
});
