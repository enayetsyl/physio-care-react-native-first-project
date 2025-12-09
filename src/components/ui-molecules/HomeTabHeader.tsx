import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Avatar from "../ui-atoms/Avatar";

interface HomeTabHeaderProps {
  userName: string;
}

export default function HomeTabHeader({ userName }: HomeTabHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {getGreeting()}, {userName.split(" ")[0]}!
      </Text>
      <Avatar name={userName} size={44} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
