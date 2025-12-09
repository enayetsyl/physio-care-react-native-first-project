import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation';
import ProfileScreen from '../components/screens/ProfileScreen';
import ClinicalRecordsScreen from '../components/screens/ClinicalRecordsScreen';

import TimelineTab from '../components/screens/TimelineTab';
import PaymentsScreen from '../components/screens/PaymentScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="ClinicalRecords" component={ClinicalRecordsScreen} />
      <Stack.Screen name="MyAppointments" component={TimelineTab} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
    </Stack.Navigator>
  );
}