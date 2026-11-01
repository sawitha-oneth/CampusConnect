import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

export default function EventCard({ event, onPress }) {
  const { favorites, toggleFavorite } = useAppContext();
  const isFavorite = favorites.includes(event.id);

  return (
    <Pressable 
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} 
      onPress={onPress}
    >
      {/* Event Image */}
      <Image source={{ uri: event.image }} style={styles.image} />
      
      {/* Category Badge */}
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{event.category}</Text>
      </View>

      {/* Heart Icon (Favorite) */}
      <Pressable 
        style={styles.favoriteButton} 
        onPress={() => toggleFavorite(event.id, event.title)}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? "#EF4444" : "#FFFFFF"} 
        />
      </Pressable>

      {/* Event Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#64748B" />
          <Text style={styles.dateText}>{event.date} • {event.time}</Text>
        </View>
        
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#64748B" />
          <Text style={styles.locationText} numberOfLines={1}>{event.location}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }], // HCI: Click කරද්දී පොඩි ගානට හැකිලෙනවා වගේ පෙන්නනවා
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#E2E8F0',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.8)', // Dark transparent
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
  },
});