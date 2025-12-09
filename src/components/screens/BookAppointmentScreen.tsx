// src/components/screens/BookAppointmentScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Center, Consultant, SessionType } from "../../types/appointment";
import { HomeStackNavigationProp } from "../../types/navigation";
import SessionTypeSelector from "../ui-molecules/SessionTypeSelector";
import LocationSelector from "../ui-molecules/LocationSelector";
import BackButton from "../ui-atoms/BackButton";

export default function BookAppointmentScreen() {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [sessionType, setSessionType] = useState<SessionType>("in-person");
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [selectedConsultant, setSelectedConsultant] =
    useState<Consultant | null>(null);

  const handleProceedToBooking = () => {
    if (!selectedCenter || !selectedConsultant) {
      Alert.alert(
        "Selection Required",
        "Please select both a center and consultant to proceed.",
        [{ text: "OK" }]
      );
      return;
    }

    if (sessionType === "online") {
      navigation.navigate("VideoConsultation", {
        center: selectedCenter,
        consultant: selectedConsultant,
        sessionType,
      });
    } else {
      Alert.alert(
        "Booking Confirmed",
        `Your appointment with ${selectedConsultant.name} at ${selectedCenter.name} has been booked successfully!`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  };

  const Header = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Book Appointment</Text>
      </View>

      {/* Session Type Selector */}
      <SessionTypeSelector
        selectedType={sessionType}
        onTypeChange={setSessionType}
      />

      {/* Location & Consultant Selector */}
      <LocationSelector
        sessionType={sessionType}
        selectedCenter={selectedCenter}
        selectedConsultant={selectedConsultant}
        onCenterChange={setSelectedCenter}
        onConsultantChange={setSelectedConsultant}
      />
    </View>
  );

  const Footer = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.proceedButton,
          (!selectedCenter || !selectedConsultant) && styles.disabledButton,
        ]}
        onPress={handleProceedToBooking}
        disabled={!selectedCenter || !selectedConsultant}
      >
        <Text
          style={[
            styles.proceedButtonText,
            (!selectedCenter || !selectedConsultant) &&
              styles.disabledButtonText,
          ]}
        >
          {sessionType === "online"
            ? "Proceed to Video Consultation"
            : "Book Appointment"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={[{ key: "placeholder" }]}
      renderItem={() => null}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f5f5f5",
  },
  proceedButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#E5E5EA",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButtonText: {
    color: "#999",
  },
});
