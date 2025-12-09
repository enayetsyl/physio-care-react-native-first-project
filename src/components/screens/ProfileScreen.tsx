import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { ProfileStackNavigationProp } from "../../types/navigation";
import Avatar from "../ui-atoms/Avatar";
import { commonStyles } from "../../styles/common";
import Button from "../ui-atoms/Button";

export default function ProfileScreen() {
  const { user, setUser } = useAuth();
  const navigation = useNavigation<ProfileStackNavigationProp>();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => setUser(null),
      },
    ]);
  };

  const menuItems = [
    {
      title: "Clinical Records",
      subtitle: "View your treatment history",
      onPress: () => navigation.navigate("ClinicalRecords"),
    },
    {
      title: "My Appointments",
      subtitle: "View and manage appointments",
      onPress: () => navigation.navigate("MyAppointments"),
    },
    {
      title: "Payments",
      subtitle: "Payment methods and history",
      onPress: () => navigation.navigate("Payments"),
    },
  ];

  return (
    <ScrollView
      style={commonStyles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Patient Info Card */}
      <View style={styles.infoCard}>
        <Avatar
          name={user?.name || "User"}
          size={50}
          maxInitials={1}
          backgroundColor="#007AFF"
          style={{ marginRight: 16 }}
        />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{user?.name || "User"}</Text>
          <Text style={styles.detail}>Age: {user?.age || "Not specified"}</Text>
          <Text style={styles.detail}>
            Weight: {user?.weight ? `${user.weight} kg` : "Not specified"}
          </Text>
          <Text style={styles.detail}>
            Height: {user?.height ? `${user.height} cm` : "Not specified"}
          </Text>
          <Text style={styles.detail}>
            Blood Group: {user?.bloodGroup || "Not specified"}
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <Button
        title="Logout"
        variant="danger"
        onPress={handleLogout}
        style={styles.logoutButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 60,
  },
  infoContent: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  menuContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  arrow: {
    fontSize: 20,
    color: "#ccc",
    fontWeight: "bold",
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
});
