import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SessionType } from '../../types/appointment';

interface SessionTypeSelectorProps {
  selectedType: SessionType;
  onTypeChange: (type: SessionType) => void;
}

export default function SessionTypeSelector({ 
  selectedType, 
  onTypeChange 
}: SessionTypeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Session Type</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedType === 'in-person' && styles.activeButton
          ]}
          onPress={() => onTypeChange('in-person')}
        >
          <Text style={[
            styles.buttonText,
            selectedType === 'in-person' && styles.activeButtonText
          ]}>
            In-person
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedType === 'online' && styles.activeButton
          ]}
          onPress={() => onTypeChange('online')}
        >
          <Text style={[
            styles.buttonText,
            selectedType === 'online' && styles.activeButtonText
          ]}>
            Online
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeButtonText: {
    color: '#fff',
  },
});