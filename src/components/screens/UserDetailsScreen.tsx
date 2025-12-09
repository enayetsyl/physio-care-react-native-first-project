import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../context/AuthContext";
import { AuthNavigationProp } from "../../types/navigation";
import { User } from "../../types/user";
import { useNavigation } from "@react-navigation/native";
import Button from "../ui-atoms/Button";

interface Props {
  navigation: AuthNavigationProp;
}

export default function UserDetailsScreen() {
  const { user, setUser } = useAuth();
  const navigation = useNavigation<AuthNavigationProp>();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
    email: user?.email || "",
    age: user?.age?.toString() || "",
    weight: user?.weight?.toString() || "",
    height: user?.height?.toString() || "",
    bloodGroup: user?.bloodGroup || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceed = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    // Update user with form data
    setUser({
      id: user?.id,
      mobile: user?.mobile || "", // Ensure mobile is always a string
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender as "male" | "female" | "other",
      email: formData.email,
      age: formData.age ? parseInt(formData.age) : undefined,
      weight: formData.weight ? parseInt(formData.weight) : undefined,
      height: formData.height ? parseInt(formData.height) : undefined,
      bloodGroup: formData.bloodGroup,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.subtitle}>
          Please provide your details to complete the setup
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange("dateOfBirth", value)}
              placeholder="DD/MM/YYYY"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(value) => handleInputChange("age", value)}
              placeholder="Enter your age"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioGroup}>
              {["male", "female", "other"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.radioOption,
                    formData.gender === option && styles.radioSelected,
                  ]}
                  onPress={() => handleInputChange("gender", option)}
                >
                  <Text
                    style={[
                      styles.radioText,
                      formData.gender === option && styles.radioTextSelected,
                    ]}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={formData.weight}
              onChangeText={(value) => handleInputChange("weight", value)}
              placeholder="Enter your weight"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={formData.height}
              onChangeText={(value) => handleInputChange("height", value)}
              placeholder="Enter your height"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Group</Text>
            <TextInput
              style={styles.input}
              value={formData.bloodGroup}
              onChangeText={(value) => handleInputChange("bloodGroup", value)}
              placeholder="e.g., O+, A-, B+"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email ID *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Button title="Proceed to Home" onPress={handleProceed} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
  },
  form: {
    marginTop: 10,
    gap: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 8,
  },
  radioOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E8F1FF",
  },
  radioText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  radioTextSelected: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
