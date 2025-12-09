import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "../types/navigation";

import HomeStackNavigator from "./HomeStackNavigator";
import TimelineTab from "../components/screens/TimelineTab";
import SupportStackNavigator from "./SupportStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import RegimenTab from "../components/ui-molecules/RegimenTab";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineTab}
        options={{ tabBarLabel: "Timeline" }}
      />
       <Tab.Screen
        name="Regimen"
        component={RegimenTab}
        options={{ tabBarLabel: "Regimen" }}
      />
      <Tab.Screen
        name="Support"
        component={SupportStackNavigator}
        options={{ tabBarLabel: "Support" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
