import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import BackButton from "../ui-atoms/BackButton";

type TitleAlignment = "left" | "center";

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  paddingTop?: number;
  backgroundColor?: string;
  titleAlignment?: TitleAlignment;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  backButtonProps?: Partial<React.ComponentProps<typeof BackButton>>;
}

export default function ScreenHeader({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightComponent,
  paddingTop = 50,
  backgroundColor = "#fff",
  titleAlignment = "left",
  containerStyle,
  titleStyle,
  subtitleStyle,
  backButtonProps,
}: ScreenHeaderProps) {
  return (
    <View
      style={[
        styles.container,
        { paddingTop, backgroundColor },
        containerStyle,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          {showBackButton && onBackPress ? (
            <BackButton onPress={onBackPress} {...backButtonProps} />
          ) : null}
        </View>

        <View
          style={[
            styles.titleContainer,
            titleAlignment === "center" && styles.centerTitle,
          ]}
        >
          {title ? (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          ) : null}
          {subtitle ? (
            <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
          ) : null}
        </View>

        <View style={styles.right}>{rightComponent}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    minWidth: 60,
  },
  right: {
    minWidth: 60,
    alignItems: "flex-end",
  },
  titleContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerTitle: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B6B6B",
  },
});
