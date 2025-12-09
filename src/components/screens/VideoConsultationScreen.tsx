import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Center,
  Consultant,
  SessionType,
  DateSlot,
  TimeSlot,
} from "../../types/appointment";
import { HomeStackNavigationProp } from "../../types/navigation";
import { mockDateSlots } from "../../data/mockAppointments";
import ScreenHeader from "../ui-molecules/ScreenHeader";
import { commonStyles } from "../../styles/common";

interface VideoConsultationParams {
  center: Center;
  consultant: Consultant;
  sessionType: SessionType;
}

export default function VideoConsultationScreen() {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const route = useRoute();
  const { center, consultant, sessionType } =
    route.params as VideoConsultationParams;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  const handleBookConsultation = () => {
    if (!selectedDate || !selectedTimeSlot) {
      Alert.alert(
        "Selection Required",
        "Please select both a date and time slot to book your consultation.",
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert(
      "Booking Confirmed",
      `Your video consultation with ${consultant.name} has been booked for ${selectedDate} at ${selectedTimeSlot.time}.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  const renderDateItem = ({ item }: { item: DateSlot }) => (
    <TouchableOpacity
      style={[
        styles.dateCard,
        selectedDate === item.date && styles.selectedDateCard,
      ]}
      onPress={() => {
        setSelectedDate(item.date);
        setSelectedTimeSlot(null); // Reset time slot when date changes
      }}
    >
      <Text
        style={[
          styles.dayName,
          selectedDate === item.date && styles.selectedText,
        ]}
      >
        {item.dayName}
      </Text>
      <Text
        style={[
          styles.dayNumber,
          selectedDate === item.date && styles.selectedText,
        ]}
      >
        {item.dayNumber}
      </Text>
      <Text
        style={[
          styles.month,
          selectedDate === item.date && styles.selectedText,
        ]}
      >
        {item.month}
      </Text>
    </TouchableOpacity>
  );

  const renderTimeSlot = ({ item }: { item: TimeSlot }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        !item.available && styles.unavailableSlot,
        selectedTimeSlot?.id === item.id && styles.selectedTimeSlot,
      ]}
      onPress={() => item.available && setSelectedTimeSlot(item)}
      disabled={!item.available}
    >
      <Text
        style={[
          styles.timeText,
          !item.available && styles.unavailableText,
          selectedTimeSlot?.id === item.id && styles.selectedTimeText,
        ]}
      >
        {item.time}
      </Text>
    </TouchableOpacity>
  );

  const selectedDateData = mockDateSlots.find(
    (slot) => slot.date === selectedDate
  );

  return (
    <View style={commonStyles.container}>
      <ScreenHeader
        title="Video Consultation"
        showBackButton
        onBackPress={() => navigation.goBack()}
        paddingTop={60}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Consultant Info */}
        <View style={styles.consultantCard}>
          <Text style={styles.consultantName}>{consultant.name}</Text>
          <Text style={styles.consultantSpecialty}>{consultant.specialty}</Text>
          <Text style={styles.consultantExperience}>
            {consultant.experience} experience
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {consultant.rating}</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <FlatList
            data={mockDateSlots}
            keyExtractor={(item) => item.date}
            renderItem={renderDateItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dateList}
            contentContainerStyle={styles.dateListContainer}
          />
        </View>

        {/* Time Slot Selection */}
        {selectedDateData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <View style={styles.timeSlotsGrid}>
              {selectedDateData.slots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlot,
                    !slot.available && styles.unavailableSlot,
                    selectedTimeSlot?.id === slot.id && styles.selectedTimeSlot,
                  ]}
                  onPress={() => slot.available && setSelectedTimeSlot(slot)}
                  disabled={!slot.available}
                >
                  <Text
                    style={[
                      styles.timeText,
                      !slot.available && styles.unavailableText,
                      selectedTimeSlot?.id === slot.id &&
                        styles.selectedTimeText,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Book Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.bookButton,
              (!selectedDate || !selectedTimeSlot) && styles.disabledButton,
            ]}
            onPress={handleBookConsultation}
            disabled={!selectedDate || !selectedTimeSlot}
          >
            <Text
              style={[
                styles.bookButtonText,
                (!selectedDate || !selectedTimeSlot) &&
                  styles.disabledButtonText,
              ]}
            >
              Confirm Booking
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  consultantCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  consultantSpecialty: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 2,
  },
  consultantExperience: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    color: "#F57C00",
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  dateList: {
    marginHorizontal: 20,
  },
  dateListContainer: {
    paddingRight: 20,
  },
  dateCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    minWidth: 70,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  selectedDateCard: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  dayName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  month: {
    fontSize: 12,
    color: "#666",
  },
  selectedText: {
    color: "#fff",
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  timeSlot: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    minWidth: 100,
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  unavailableSlot: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E5E5EA",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  selectedTimeText: {
    color: "#fff",
  },
  unavailableText: {
    color: "#999",
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  bookButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#E5E5EA",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButtonText: {
    color: "#999",
  },
});
