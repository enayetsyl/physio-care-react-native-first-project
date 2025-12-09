import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockPaymentMethods, mockPaymentTransactions } from '../../data/mockPaymentRecords';
import { ProfileStackNavigationProp } from '../../types/navigation';

export default function PaymentsScreen() {
  const navigation = useNavigation<ProfileStackNavigationProp>();

  const handleDeletePaymentMethod = (id: string) => {
    alert('Payment method deleted (mock action)');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Payments</Text>
      </View>

      {/* Saved Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
        <View style={styles.methodsList}>
          {mockPaymentMethods.map((method) => (
            <View key={method.id} style={styles.methodCard}>
              <View style={styles.methodInfo}>
                <Text style={styles.methodType}>
                  {method.type === 'credit' && 'Credit Card'}
                  {method.type === 'debit' && 'Debit Card'}
                  {method.type === 'upi' && 'UPI'}
                  {method.type === 'netbanking' && 'Net Banking'}
                </Text>
                <Text style={styles.methodDetails}>
                  {method.last4 && `****${method.last4}`}
                  {method.upiId && method.upiId}
                  {method.bankName && ` • ${method.bankName}`}
                </Text>
                {method.isDefault && (
                  <Text style={styles.defaultBadge}>Default</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePaymentMethod(method.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Previous Payments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Previous Payments</Text>
        <View style={styles.transactionsList}>
          {mockPaymentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>
                  {transaction.description}
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString('en-IN')}
                </Text>
                <Text style={styles.transactionMethod}>
                  {transaction.paymentMethod}
                </Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.amountText,
                  { color: transaction.type === 'debit' ? '#FF3B30' : '#34C759' }
                ]}>
                  {transaction.type === 'debit' ? '-' : '+'}₹{transaction.amount}
                </Text>
                <Text style={styles.statusText}>{transaction.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  backArrow: {
    fontSize: 28,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  methodsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  methodInfo: {
    flex: 1,
  },
  methodType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  defaultBadge: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  transactionMethod: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
});