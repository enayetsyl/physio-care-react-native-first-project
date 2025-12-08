import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SupportStackParamList } from "../types/navigation";

import SupportTab from "../components/screens/SupportTab";
import ChatScreen from "../components/screens/ChatScreen";
import PreviousTicketsScreen from "../components/screens/PreviousTicketsScreen";
import VideoConsultationScreen from "../components/screens/VideoConsultationScreen";

const Stack = createNativeStackNavigator<SupportStackParamList>();

export default function SupportStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Support" component={SupportTab} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="PreviousTickets" component={PreviousTicketsScreen} />
      <Stack.Screen
        name="VideoConsultation"
        component={VideoConsultationScreen}
      />
    </Stack.Navigator>
  );
}
