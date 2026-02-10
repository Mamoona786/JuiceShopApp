import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import HomeStackNavigator from '../navigation/HomeStackNavigator';

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load cart items count
  const loadCartCount = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        const parsedCart = JSON.parse(cart);
        setCartItemsCount(parsedCart.length);
      } else {
        setCartItemsCount(0);
      }
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  useEffect(() => {
    // Initial load
    loadCartCount();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 15,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = focused ? 28 : 24;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={iconSize} color={color} />
              {route.name === 'Cart' && cartItemsCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItemsCount}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text
              style={[
                styles.label,
                { color },
                focused && styles.labelFocused
              ]}
            >
              {route.name}
            </Text>
          );
        },
        tabBarActiveTintColor: '#FF6B95',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen
  name="Home"
  component={HomeStackNavigator}
  listeners={{
    focus: () => loadCartCount(),
  }}
/>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        listeners={{
          focus: () => loadCartCount(),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        listeners={{
          focus: () => loadCartCount(),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={{
          focus: () => loadCartCount(),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  iconContainer: {
    position: 'relative',
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '500',
  },
  labelFocused: {
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: '#FF6B95',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomNavbar;
