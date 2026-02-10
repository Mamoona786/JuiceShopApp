import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const notifications = [
  {
    id: '1',
    title: 'Order Confirmed',
    message: 'Your order has been confirmed!',
    icon: 'checkmark-circle',
    color: '#2a9d8f',
    time: '2 min ago'
  },
  {
    id: '2',
    title: 'Juice of the Day',
    message: 'Try our new Mango Tango juice!',
    icon: 'flame',
    color: '#ff9f1c',
    time: '1 hour ago'
  },
  {
    id: '3',
    title: 'Limited Time Offer',
    message: 'Get 20% off on your next purchase.',
    icon: 'pricetag',
    color: '#ff4757',
    time: '3 hours ago'
  },
  {
    id: '4',
    title: 'Delivery Update',
    message: 'Your juice will arrive in 15 minutes!',
    icon: 'bicycle',
    color: '#1e90ff',
    time: 'Yesterday'
  },
];

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FF9A8B', '#FF6B95']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.screenTitle}>Notifications</Text>
      </LinearGradient>

      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.notificationCard}>
              <LinearGradient
                colors={[item.color, lightenColor(item.color)]}
                style={styles.iconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name={item.icon} size={22} color="#fff" />
              </LinearGradient>
              <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-off" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No notifications yet</Text>
              <Text style={styles.emptySubText}>We'll notify you when something arrives</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

// Helper function to lighten colors for gradient
const lightenColor = (color) => {
  // This is a simplified version - you might want to use a proper color library
  return color + '80'; // Adds transparency
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffebf3',
  },
  headerGradient: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default NotificationScreen;
