import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Reusable button with consistent theming across the app.
 * Supports variants and disabled state styling.
 */
export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${variant}Text`],
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  primaryText: {
    color: "#fff",
  },
  secondary: {
    backgroundColor: "#f0f0f0",
  },
  secondaryText: {
    color: "#333",
  },
  danger: {
    backgroundColor: "#FF3B30",
  },
  dangerText: {
    color: "#fff",
  },
  disabled: {
    backgroundColor: "#E5E5EA",
  },
  disabledText: {
    color: "#999",
  },
});
