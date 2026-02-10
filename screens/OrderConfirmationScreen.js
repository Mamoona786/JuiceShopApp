// screens/OrderConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const OrderConfirmationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF9A8B', '#FF6B95']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.headerText}>Order Confirmed</Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.confirmationCard}>
          <View style={styles.circle}>
            <MaterialIcons name="check" size={60} color="#FF6B95" />
          </View>

          <Text style={styles.message}>Your order has been placed successfully!</Text>

          <Text style={styles.subMessage}>
            Thank you for your purchase. Your order number is #{Math.floor(Math.random() * 1000000)}.
          </Text>

          {/* Added Image with product example */}
          <View style={styles.imageContainer}>
  <Image
    source={require('../assets/images/delivery-rider.png')}
    style={styles.productImage}
    resizeMode="cover"
  />
</View>

        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <LinearGradient
            colors={['#FF9A8B', '#FF6B95']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginBottom: 100,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  confirmationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF9A8B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 30,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 154, 139, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  message: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
    lineHeight: 30,
  },
  subMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    // marginVertical: 15,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 106, 149, 0.8)',
    padding: 10,
  },
  imageText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 45,
    shadowColor: '#FF6B95',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 300,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default OrderConfirmationScreen;
