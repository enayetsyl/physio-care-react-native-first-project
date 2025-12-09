// src/components/screens/BookAppointmentScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Center, Consultant, SessionType } from "../../types/appointment";
import { HomeStackNavigationProp } from "../../types/navigation";
import SessionTypeSelector from "../ui-molecules/SessionTypeSelector";
import LocationSelector from "../ui-molecules/LocationSelector";
import ScreenHeader from "../ui-molecules/ScreenHeader";
import { commonStyles } from "../../styles/common";
import Button from "../ui-atoms/Button";

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
      <ScreenHeader
        title="Book Appointment"
        showBackButton
        onBackPress={() => navigation.goBack()}
        paddingTop={40}
      />

      <SessionTypeSelector
        selectedType={sessionType}
        onTypeChange={setSessionType}
      />

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
      <Button
        title={
          sessionType === "online"
            ? "Proceed to Video Consultation"
            : "Book Appointment"
        }
        onPress={handleProceedToBooking}
        disabled={!selectedCenter || !selectedConsultant}
      />
    </View>
  );

  return (
    <FlatList
      data={[{ key: "placeholder" }]}
      renderItem={() => null}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      style={commonStyles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
});
