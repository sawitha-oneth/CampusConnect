import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { eventsData } from '../../data/eventsData';
import EventCard from '../../components/EventCard';
import { useAppContext } from '../../context/AppContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useAppContext();

  
  const favoriteEvents = eventsData.filter(event => favorites.includes(event.id));

  
  if (favoriteEvents.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="heart-dislike-outline" size={60} color="#94A3B8" />
        </View>
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptyText}>You haven't bookmarked any events. Go to the Events tab and tap the heart icon to save them here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            onPress={() => router.push(`/event/${item.id}`)} 
          />
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 16 },
  emptyContainer: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', padding: 30 },
  iconCircle: { width: 120, height: 120, backgroundColor: '#E2E8F0', borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24 },
});