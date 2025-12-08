import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Session } from '../../types/session';

interface SessionCardProps {
  session: Session;
  onPress: (session: Session) => void;
}

export default function SessionCard({ session, onPress }: SessionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#007AFF';
      case 'completed': return '#34C759';
      case 'cancelled': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Visit Booked';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const progressPercentage = session.totalExercises > 0 
    ? (session.completedExercises / session.totalExercises) * 100 
    : 0;

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(session)}
    >
      <View style={styles.leftSection}>
        <Text style={styles.dateText}>{formatDate(session.date)}</Text>
      </View>
      
      <View style={styles.rightSection}>
        <View style={styles.headerRow}>
          <Text style={styles.sessionType}>{session.type}</Text>
          <Text style={[styles.status, { color: getStatusColor(session.status) }]}>
            {getStatusText(session.status)}
          </Text>
        </View>
        
        <Text style={styles.consultantName}>{session.consultant.name}</Text>
        <Text style={styles.time}>{session.time}</Text>
        
        {session.status === 'completed' && session.totalExercises > 0 && (
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {session.completedExercises}/{session.totalExercises}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  rightSection: {
    flex: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sessionType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
  },
  consultantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
});