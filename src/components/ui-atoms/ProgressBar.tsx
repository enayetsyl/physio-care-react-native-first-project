import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  showLabel?: boolean;
  label?: string;
  borderRadius?: number;
}

/**
 * Reusable progress bar to keep fill/track styling consistent across the app.
 * Clamps progress to 0-100 to avoid layout issues.
 */
export default function ProgressBar({
  progress,
  height = 8,
  backgroundColor = "#E5E5EA",
  fillColor = "#007AFF",
  showLabel = false,
  label,
  borderRadius = 4,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View>
      {showLabel && label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.container,
          {
            height,
            backgroundColor,
            borderRadius,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: fillColor,
              borderRadius,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
});
