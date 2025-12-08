import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  StyleSheet,
  Alert
} from 'react-native';
import { Center, Consultant, SessionType } from '../../types/appointment';
import { mockCenters, mockConsultants } from '../../data/mockAppointments';

interface LocationSelectorProps {
  sessionType: SessionType;
  selectedCenter: Center | null;
  selectedConsultant: Consultant | null;
  onCenterChange: (center: Center) => void;
  onConsultantChange: (consultant: Consultant | null) => void;
}

export default function LocationSelector({
  sessionType,
  selectedCenter,
  selectedConsultant,
  onCenterChange,
  onConsultantChange,
}: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCenterDropdown, setShowCenterDropdown] = useState(false);
  const [showConsultantDropdown, setShowConsultantDropdown] = useState(false);

  // Filter consultants based on selected center and search query
  const availableConsultants = useMemo(() => {
    if (!selectedCenter) return [];
    
    let consultants = mockConsultants.filter(c => c.centerId === selectedCenter.id);
    
    if (searchQuery.trim()) {
      consultants = consultants.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return consultants;
  }, [selectedCenter, searchQuery]);

  const handleCenterSelect = (center: Center) => {
    onCenterChange(center);
    onConsultantChange(null); // Reset consultant when center changes
    setShowCenterDropdown(false);
  };

  const handleConsultantSelect = (consultant: Consultant) => {
    onConsultantChange(consultant);
    setShowConsultantDropdown(false);
    setSearchQuery('');
  };

  const renderCenterItem = ({ item }: { item: Center }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleCenterSelect(item)}
    >
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemSubtitle}>{item.address}, {item.city}</Text>
    </TouchableOpacity>
  );

  const renderConsultantItem = ({ item }: { item: Consultant }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleConsultantSelect(item)}
    >
      <View style={styles.consultantHeader}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
      </View>
      <Text style={styles.itemSubtitle}>{item.specialty} • {item.experience}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Center Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>
          {sessionType === 'in-person' ? 'Select Center' : 'Select Location'}
        </Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setShowCenterDropdown(!showCenterDropdown)}
        >
          <Text style={selectedCenter ? styles.selectedText : styles.placeholderText}>
            {selectedCenter ? selectedCenter.name : 'Choose a center...'}
          </Text>
          <Text style={styles.arrow}>{showCenterDropdown ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showCenterDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={mockCenters}
              keyExtractor={(item) => item.id}
              renderItem={renderCenterItem}
              style={styles.dropdownList}
              nestedScrollEnabled={true}
            />
          </View>
        )}
      </View>

      {/* Consultant Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Select Consultant</Text>
        
        {selectedCenter ? (
          <>
            <TextInput
              style={styles.searchInput}
              placeholder="Search consultants..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setShowConsultantDropdown(true)}
            />
            
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowConsultantDropdown(!showConsultantDropdown)}
            >
              <Text style={selectedConsultant ? styles.selectedText : styles.placeholderText}>
                {selectedConsultant ? selectedConsultant.name : 'Choose a consultant...'}
              </Text>
              <Text style={styles.arrow}>{showConsultantDropdown ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {showConsultantDropdown && (
              <View style={styles.dropdown}>
                {availableConsultants.length > 0 ? (
                  <FlatList
                    data={availableConsultants}
                    keyExtractor={(item) => item.id}
                    renderItem={renderConsultantItem}
                    style={styles.dropdownList}
                    nestedScrollEnabled={true}
                  />
                ) : (
                  <View style={styles.noConsultants}>
                    <Text style={styles.noConsultantsText}>
                      No consultants available for "{searchQuery}"
                    </Text>
                  </View>
                )}
              </View>
            )}
          </>
        ) : (
          <View style={styles.disabledSection}>
            <Text style={styles.disabledText}>
              Please select a center first
            </Text>
          </View>
        )}
      </View>

      {/* Booking Fee Message */}
      {selectedCenter && selectedConsultant && (
        <View style={styles.feeMessage}>
          <Text style={styles.feeText}>
            We charge INR 100 to ensure your booking. It will be adjusted in your final payment.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
  arrow: {
    fontSize: 14,
    color: '#666',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    maxHeight: 200,
  },
  dropdownList: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  consultantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '600',
  },
  noConsultants: {
    padding: 20,
    alignItems: 'center',
  },
  noConsultantsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  disabledSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
  },
  disabledText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  feeMessage: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
  },
  feeText: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
    lineHeight: 20,
  },
});