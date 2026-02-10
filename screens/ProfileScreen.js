import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem('currentUser');
        setCurrentUser(raw ? JSON.parse(raw) : null);
      } catch (e) {
        setCurrentUser(null);
      }
    };
    if (isFocused) loadUser();
  }, [isFocused]);

  const isLoggedIn = !!currentUser;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setCurrentUser(null);
    } catch (e) {}
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#FF9A8B', '#FF6B95']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.screenTitle}>{isLoggedIn ? 'My Profile' : 'Welcome'}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: isLoggedIn
                  ? 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg'
                  : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }}
              style={styles.avatar}
            />
            {isLoggedIn && (
              <TouchableOpacity style={styles.editIcon}>
                <Ionicons name="create-outline" size={18} color="#FF6B95" />
              </TouchableOpacity>
            )}
          </View>

          {isLoggedIn ? (
  <View style={styles.profileInfo}>
    <Text style={styles.name}>{currentUser?.name || 'User'}</Text>
    <Text style={styles.email}>{currentUser?.email || ''}</Text>
    <View style={styles.memberSinceContainer}>
      <Ionicons name="calendar-outline" size={14} color="#888" />
      <Text style={styles.memberSince}> Member since</Text>
    </View>
  </View>
) : (
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Guest User</Text>
              <Text style={styles.guestMessage}>Sign in to access all features</Text>
            </View>
          )}
        </View>

        {/* Stats Section - Only show for logged in users */}
        {isLoggedIn && (
          <View style={styles.statsContainer}>
            {[
              { value: '24', label: 'Orders', icon: 'cart-outline' },
              { value: '4.9', label: 'Rating', icon: 'star-outline' },
              { value: '12', label: 'Favorites', icon: 'heart-outline' }
            ].map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <LinearGradient
                  colors={['#FF9A8B', '#FF6B95']}
                  style={styles.statIconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name={stat.icon} size={20} color="#fff" />
                </LinearGradient>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Menu Options - Different options for guest vs logged in */}
        <View style={styles.menuSection}>
          {isLoggedIn ? (
            <>
              {[
                { icon: 'create-outline', text: 'Edit Profile' },
                { icon: 'time-outline', text: 'Order History' },
                { icon: 'heart-outline', text: 'Favorites' },
                { icon: 'settings-outline', text: 'Settings' },
                { icon: 'help-circle-outline', text: 'Help Center' }
              ].map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={[styles.menuIconContainer, { backgroundColor: '#ffebf3' }]}>
                    <Ionicons name={item.icon} size={20} color="#FF6B95" />
                  </View>
                  <Text style={styles.menuText}>{item.text}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#ccc" />
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {[
                { icon: 'log-in-outline', text: 'Sign In', action: 'login' },
                { icon: 'person-add-outline', text: 'Create Account', action: 'register' },
                { icon: 'help-circle-outline', text: 'Help Center', action: 'help' }
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
  if (item.action === 'login') navigation.navigate('Home', { screen: 'LoginScreen' });
 else if (item.action === 'register') navigation.navigate('Home', { screen: 'RegisterScreen' });
  else console.log('help');
}}
                >
                  <View style={[styles.menuIconContainer, { backgroundColor: '#ffebf3' }]}>
                    <Ionicons name={item.icon} size={20} color="#FF6B95" />
                  </View>
                  <Text style={styles.menuText}>{item.text}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#ccc" />
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>

        {/* Action Button - Login/Signup for guest, Logout for logged in */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
  if (isLoggedIn) handleLogout();
  else navigation.navigate('Home', { screen: 'LoginScreen' });
}}

        >
          <LinearGradient
            colors={['#FF9A8B', '#FF6B95']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons
              name={isLoggedIn ? 'log-out-outline' : 'log-in-outline'}
              size={20}
              color="#fff"
            />
            <Text style={styles.actionText}>
              {isLoggedIn ? 'Log Out' : 'Sign In'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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
    paddingBottom: 110,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  guestMessage: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  memberSinceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  memberSince: {
    fontSize: 14,
    color: '#888',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B95',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  actionButton: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  actionGradient: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProfileScreen;
