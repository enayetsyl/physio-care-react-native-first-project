import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type SearchInputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchInput({
  value,
  onChangeText,
  placeholder = "Search...",
  style,
  ...rest
}: SearchInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoCorrect={false}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e1e5e9",
  },
});
