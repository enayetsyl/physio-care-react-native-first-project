import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChartDataPoint {
  date: string;
  strength: number;
  flexibility: number;
}

interface HealthChartProps {
  title?: string;
  data?: ChartDataPoint[];
}

// Mock data for the chart
const mockChartData: ChartDataPoint[] = [
  { date: 'Day 1', strength: 20, flexibility: 30 },
  { date: 'Day 7', strength: 22, flexibility: 35 },
  { date: 'Day 14', strength: 24, flexibility: 38 },
  { date: 'Day 21', strength: 25, flexibility: 42 },
  { date: 'Day 28', strength: 25, flexibility: 45 },
];

export default function HealthChart({ 
  title = 'Knee Extension: Seated (90)',
  data = mockChartData 
}: HealthChartProps) {
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.strength, d.flexibility))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.chartContainer}>
        {data.map((point, index) => (
          <View key={index} style={styles.barGroup}>
            <View style={styles.bars}>
              {/* Strength bar */}
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    styles.strengthBar,
                    { height: `${(point.strength / maxValue) * 100}%` },
                  ]}
                />
                <Text style={styles.barLabel}>{point.strength}</Text>
              </View>
              
              {/* Flexibility bar */}
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    styles.flexibilityBar,
                    { height: `${(point.flexibility / maxValue) * 100}%` },
                  ]}
                />
                <Text style={styles.barLabel}>{point.flexibility}</Text>
              </View>
            </View>
            <Text style={styles.dateLabel}>{point.date}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.strengthBar]} />
          <Text style={styles.legendText}>Strength</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.flexibilityBar]} />
          <Text style={styles.legendText}>Flexibility</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    marginBottom: 16,
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    minHeight: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  strengthBar: {
    backgroundColor: '#007AFF',
  },
  flexibilityBar: {
    backgroundColor: '#34C759',
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  dateLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});