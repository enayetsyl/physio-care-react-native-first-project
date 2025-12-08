import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { mockGoals } from '../../data/mockGoals';
import { Goal, GoalTabType } from '../../types/goal';
import HomeTabHeader from '../ui-molecules/HomeTabHeader';
import GoalCard from '../ui-molecules/GoalCard';
import HealthChart from '../ui-molecules/HealthChart';
import { HomeStackNavigationProp } from '../../types/navigation';

export default function HomeTabMain() {
  const { user } = useAuth();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [activeTab, setActiveTab] = useState<GoalTabType>('active');

  const userName = user?.name || 'User';

  const filteredGoals = mockGoals.filter(
    goal => goal.status === activeTab
  );

  const handleGoalPress = (goal: Goal) => {
    navigation.navigate('GoalDetails', { goalId: goal.id });
  };

  const handleBookAppointment = () => {
    navigation.navigate('BookAppointment');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeTabHeader userName={userName} />

      {/* Book Appointment Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBookAppointment}
      >
        <Text style={styles.bookButtonText}>+ Book an appointment</Text>
      </TouchableOpacity>

      {/* My Goals Section */}
      <View style={styles.goalsSection}>
        <Text style={styles.sectionTitle}>My Goals</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.activeTabText,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.activeTabText,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Goals List */}
        <View style={styles.goalsList}>
          {filteredGoals.length > 0 ? (
            filteredGoals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onPress={() => handleGoalPress(goal)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No {activeTab} goals yet
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Health Chart */}
      <HealthChart />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  goalsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'capitalize',
  },
  activeTabText: {
    color: '#fff',
  },
  goalsList: {
    paddingHorizontal: 20,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
  },
});