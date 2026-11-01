import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function ProfileScreen() {
  const { user, favorites } = useAppContext();

  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {}
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>Student ID: {user.id}</Text>
        <Text style={styles.faculty}>Faculty of {user.faculty}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Saved Events</Text>
        </View>
      </View>

      {/* Settings List */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconBg}>
            <Ionicons name="notifications-outline" size={22} color="#208AEF" />
          </View>
          <Text style={styles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconBg}>
            <Ionicons name="settings-outline" size={22} color="#208AEF" />
          </View>
          <Text style={styles.menuText}>App Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconBg, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          </View>
          <Text style={[styles.menuText, { color: '#EF4444' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.versionText}>Campus Connect v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#FFFFFF', padding: 30, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  avatarContainer: { width: 100, height: 100, backgroundColor: '#208AEF', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 4, borderColor: '#E0F2FE' },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#FFFFFF' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  role: { fontSize: 16, color: '#64748B', marginTop: 5, fontWeight: '500' },
  faculty: { fontSize: 14, color: '#94A3B8', marginTop: 2 },
  statsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: -30 }, // Overlap කරන්න
  statBox: { backgroundColor: '#FFFFFF', width: '80%', padding: 20, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  statNumber: { fontSize: 28, fontWeight: '900', color: '#208AEF' },
  statLabel: { fontSize: 14, color: '#64748B', fontWeight: '600', marginTop: 4 },
  menuContainer: { marginTop: 30, paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 12 },
  menuIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0F9FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1E293B' },
  versionText: { textAlign: 'center', color: '#94A3B8', marginTop: 20, fontSize: 12 },
});