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
  Support: undefined;
  Profile: undefined;
};

export type RootNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = import('@react-navigation/bottom-tabs').BottomTabNavigationProp<MainTabParamList>;