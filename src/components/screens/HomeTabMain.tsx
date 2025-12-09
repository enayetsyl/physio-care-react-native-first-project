import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { mockGoals } from "../../data/mockGoals";
import { Goal, GoalTabType } from "../../types/goal";
import HomeTabHeader from "../ui-molecules/HomeTabHeader";
import GoalCard from "../ui-molecules/GoalCard";
import HealthChart from "../ui-molecules/HealthChart";
import EmptyState from "../ui-molecules/EmptyState";
import TabGroup from "../ui-molecules/TabGroup";
import { HomeStackNavigationProp } from "../../types/navigation";
import { commonStyles } from "../../styles/common";
import Button from "../ui-atoms/Button";

export default function HomeTabMain() {
  const { user } = useAuth();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [activeTab, setActiveTab] = useState<GoalTabType>("active");

  const userName = user?.name || "User";

  const filteredGoals = mockGoals.filter((goal) => goal.status === activeTab);

  const handleGoalPress = (goal: Goal) => {
    navigation.navigate("GoalDetails", { goalId: goal.id });
  };

  const handleBookAppointment = () => {
    navigation.navigate("BookAppointment");
  };

  return (
    <ScrollView
      style={commonStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <HomeTabHeader userName={userName} />

      {/* Book Appointment Button */}
      <Button
        title="+ Book an appointment"
        onPress={handleBookAppointment}
        style={styles.bookButton}
      />

      {/* My Goals Section */}
      <View style={styles.goalsSection}>
        <Text style={styles.sectionTitle}>My Goals</Text>

        <TabGroup
          tabs={[
            { key: "active", label: "Active" },
            { key: "completed", label: "Completed" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Goals List */}
        <View style={styles.goalsList}>
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onPress={() => handleGoalPress(goal)}
              />
            ))
          ) : (
            <EmptyState title={`No ${activeTab} goals yet`} />
          )}
        </View>
      </View>

      {/* Health Chart */}
      <HealthChart />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bookButton: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  goalsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  goalsList: {
    paddingHorizontal: 20,
  },
});
