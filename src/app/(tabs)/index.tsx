import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { eventsData } from '../../data/eventsData';
import EventCard from '../../components/EventCard';

export default function EventsScreen() {
  const router = useRouter();
  
  // Modal එක පෙන්නන්න/හංගන්න State එකක්
  const [modalVisible, setModalVisible] = useState(false);
  // අපි මේකෙන් Filter කරමු (උදා: All, Technology, Sports)
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Category එකට අනුව ඉවෙන්ට්ස් Filter කරන Function එක
  const filteredEvents = selectedCategory === 'All' 
    ? eventsData 
    : eventsData.filter(event => event.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header සහ Filter Button */}
      <View style={styles.headerRow}>
        <Text style={styles.welcomeText}>Find Your Next Event</Text>
        
        {/* Filter Modal එක open කරන Button එක */}
        <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={20} color="#FFFFFF" />
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>

      {/* ඉවෙන්ට්ස් ලිස්ට් එක (FlatList) */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            
            onPress={() => router.push(`/event/${item.id}`)} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Category</Text>
            
            {['All', 'Technology', 'Sports', 'Culture', 'Career'].map((category) => (
              <TouchableOpacity 
                key={category}
                style={[
                  styles.categoryOption, 
                  selectedCategory === category && styles.selectedCategory
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setModalVisible(false); 
                }}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
                {selectedCategory === category && (
                  <Ionicons name="checkmark-circle" size={24} color="#208AEF" />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 16, paddingTop: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  filterButton: { flexDirection: 'row', backgroundColor: '#208AEF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  filterText: { color: '#FFFFFF', fontWeight: 'bold', marginLeft: 6 },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 20, textAlign: 'center' },
  categoryOption: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  selectedCategory: { backgroundColor: '#F0F9FF', borderRadius: 10, paddingHorizontal: 10, borderBottomWidth: 0, marginVertical: 5 },
  categoryText: { fontSize: 16, color: '#64748B' },
  selectedCategoryText: { color: '#208AEF', fontWeight: 'bold' },
  closeButton: { marginTop: 20, backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, alignItems: 'center' },
  closeButtonText: { fontSize: 16, fontWeight: 'bold', color: '#64748B' },
});