import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { eventsData } from '../../data/eventsData';
import { useAppContext } from '../../context/AppContext';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams(); // URL එකෙන් එන ID එක ගන්නවා
  const router = useRouter();
  const { favorites, toggleFavorite } = useAppContext();

  // අදාළ ඉවෙන්ට් එක විතරක් හොයාගන්නවා
  const event = eventsData.find((e) => e.id === id);
  const isFavorite = favorites.includes(id as string);

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text>Event not found!</Text>
      </View>
    );
  }

  // Bookmark කරද්දී පෙන්නන Confirmation (Modal වෙනුවට Alert එකක් පාවිච්චි කළා, ඒත් මේකත් හොඳ UI එකක්)
    const handleBookmark = () => {
    toggleFavorite(event.id, event.title); // මෙතන event.title එකතු කළා
    
    if (!isFavorite) {
      Alert.alert("Success", "Event added to your favorites!");
    } else {
      Alert.alert("Removed", "Event removed from favorites.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{event.category}</Text>
        </View>
        
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#208AEF" />
          <Text style={styles.infoText}>{event.date} at {event.time}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#208AEF" />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        <Text style={styles.sectionTitle}>About this Event</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>

      {/* පහළින් Fixed වෙලා තියෙන Bookmark Button එක */}
      <View style={styles.footer}>
        <Pressable 
          style={[styles.bookmarkBtn, isFavorite && styles.bookmarkedBtn]} 
          onPress={handleBookmark}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color="#FFFFFF" 
          />
          <Text style={styles.bookmarkText}>
            {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  badge: { backgroundColor: '#F0F9FF', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 15 },
  badgeText: { color: '#208AEF', fontWeight: 'bold', fontSize: 14 },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B', marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoText: { fontSize: 16, color: '#475569', marginLeft: 10, fontWeight: '500' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginTop: 20, marginBottom: 10 },
  description: { fontSize: 16, color: '#64748B', lineHeight: 24 },
  footer: { padding: 20, paddingBottom: 40 },
  bookmarkBtn: { flexDirection: 'row', backgroundColor: '#208AEF', padding: 18, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  bookmarkedBtn: { backgroundColor: '#EF4444' }, // Save කරලා නම් රතු පාට
  bookmarkText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});