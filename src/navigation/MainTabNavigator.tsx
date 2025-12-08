import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Placeholder screens for now
const HomeTab = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Tab</Text>
  </View>
);

const TimelineTab = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Timeline Tab</Text>
  </View>
);

const SupportTab = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Support Tab</Text>
  </View>
);

const ProfileTab = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Tab</Text>
  </View>
);

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeTab}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Timeline" 
        component={TimelineTab}
        options={{ tabBarLabel: 'Timeline' }}
      />
      <Tab.Screen 
        name="Support" 
        component={SupportTab}
        options={{ tabBarLabel: 'Support' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileTab}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}