import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { AuthNavigationProp, AuthStackParamList } from "../../types/navigation";
import Button from "../ui-atoms/Button";

interface Props {
  navigation: AuthNavigationProp;
  route: RouteProp<AuthStackParamList, "OTP">;
}

export default function OTPScreen({ navigation, route }: Props) {
  const { mobile } = route.params;
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Mock validation: accept any 4-6 digit OTP
    const cleanedOtp = otp.replace(/\D/g, "");

    if (cleanedOtp.length < 4 || cleanedOtp.length > 6) {
      Alert.alert("Invalid OTP", "Please enter a valid OTP (4-6 digits)");
      return;
    }

    // Mock verification success
    Alert.alert("OTP Verified", "Proceeding to fill details...", [
      {
        text: "OK",
        onPress: () => navigation.navigate("UserDetails"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We sent an OTP to {mobile}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
        />
      </View>

      <Button title="Verify OTP" onPress={handleVerify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    letterSpacing: 8,
  },
});
