import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { AuthNavigationProp } from "../../types/navigation";
import Button from "../ui-atoms/Button";

interface Props {
  navigation: AuthNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [mobile, setMobile] = useState("");

  const handleSendOTP = () => {
    // Validate mobile number (10 digits for now)
    const cleanedMobile = mobile.replace(/\D/g, "");

    if (cleanedMobile.length !== 10) {
      Alert.alert(
        "Invalid Mobile",
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // Navigate to OTP screen with mobile number
    navigation.navigate("OTP", { mobile: cleanedMobile });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PhysioCare</Text>
      <Text style={styles.subtitle}>Enter your mobile number to continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          maxLength={10}
        />
      </View>

      <Button title="Send OTP" onPress={handleSendOTP} />
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
  },
});
