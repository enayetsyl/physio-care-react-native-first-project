export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  OTP: { mobile: string };
  UserDetails: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Timeline: undefined;
  Regimen: undefined;
  Support: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  GoalDetails: { goalId: string };
  BookAppointment: undefined;
  VideoConsultation: {
    center: import("./appointment").Center;
    consultant: import("./appointment").Consultant;
    sessionType: import("./appointment").SessionType;
  };
};

export type SupportStackParamList = {
  Support: undefined;
  Chat: undefined;
  PreviousTickets: undefined;
  VideoConsultation: {
    center: import('./appointment').Center;
    consultant: import('./appointment').Consultant;
    sessionType: import('./appointment').SessionType;
  };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ClinicalRecords: undefined;
  MyAppointments: undefined;
  Payments: undefined;
};

export type HomeStackNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<HomeStackParamList>;
export type SupportStackNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<SupportStackParamList>;
export type RootNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = import('@react-navigation/bottom-tabs').BottomTabNavigationProp<MainTabParamList>;

export type ProfileStackNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<ProfileStackParamList>;