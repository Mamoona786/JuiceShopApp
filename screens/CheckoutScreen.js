import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import juiceImages from '../assets/juiceImages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ route, navigation }) => {

  const {
  cartItems = [],
  subtotal: subtotalParam,
  total: totalParam,   // legacy support
  userDetails,
} = route.params || {};

const subtotal = typeof subtotalParam === 'number'
  ? subtotalParam
  : (typeof totalParam === 'number' ? totalParam : 0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
  if (userDetails) {
    setName(userDetails.name || '');
    setPhone(userDetails.phone || '');
    setDeliveryAddress(userDetails.address || '');
  }
}, [userDetails]);

  const deliveryFee = 100;
const taxAmount = subtotal * 0.05;
const grandTotal = subtotal + deliveryFee + taxAmount;

  const renderProgressBar = () => {
    const steps = ['Checkout', 'Payment', 'Confirmation'];
    return (
      <View style={styles.progressContainer}>
        {steps.map((step, index) => {
          const isActive = index === 0;
          return (
            <React.Fragment key={index}>
              <View style={styles.progressStep}>
                <View style={[styles.circle, isActive && styles.circleActive]}>
                  <Text style={[styles.stepNumber, isActive && styles.stepNumberActive]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{step}</Text>
              </View>
              {index !== steps.length - 1 && <View style={styles.progressLine} />}
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const imageSource = juiceImages[item.image] || require('../assets/images/all-icon.jpeg');
    return (
      <View style={styles.itemRow}>
        <Image source={imageSource} style={styles.itemImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}{item.size ? ` (${item.size})` : ''}
          </Text>
          <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
        </View>
        <Text style={styles.itemPrice}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    );
  };

  const placeOrder = () => {
  navigation.navigate('PaymentScreen', {
    cartItems,
    subtotal,
    deliveryFee,
 taxAmount,
  grandTotal,
  });
};

  const goToLogin = async () => {
  await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  await AsyncStorage.setItem('subtotal', String(subtotal));
  navigation.navigate('LoginScreen', { cartItems, subtotal });
};

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF9A8B', '#FF6B95']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderProgressBar()}

        <View style={styles.contentContainer}>
          {/* Order summary */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="receipt" size={20} color="#FF6B95" />
              <Text style={styles.sectionTitle}>Order Summary</Text>
            </View>
            <View style={styles.card}>
              <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                scrollEnabled={false}
              />

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>Rs. {subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Delivery fee</Text>
                <Text style={styles.totalValue}>Rs. {deliveryFee.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text style={styles.totalValue}>Rs. {taxAmount.toFixed(2)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={[styles.totalRow, styles.grand]}>
                <Text style={styles.grandLabel}>Total</Text>
                <Text style={styles.grandValue}>Rs. {grandTotal.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Account hint */}
          <View style={[styles.section, { marginBottom: 10 }]}>
            <View style={styles.loginRow}>
              <Text style={styles.haveAccountText}>Have an account?</Text>
              <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.loginLink}> Login.</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact and delivery form */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="person" size={20} color="#FF6B95" />
              <Text style={styles.sectionTitle}>User Details</Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
                style={styles.input}
                placeholderTextColor="#9B9B9B"
              />

              <Text style={styles.inputLabel}>Phone number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="03XXXXXXXXX"
                style={styles.input}
                keyboardType="phone-pad"
                placeholderTextColor="#9B9B9B"
              />

              <Text style={styles.inputLabel}>Delivery address</Text>
              <TextInput
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
                placeholder="House, street, area, city"
                style={[styles.input, styles.inputMultiline]}
                placeholderTextColor="#9B9B9B"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={placeOrder}
          disabled={isPlacingOrder}
        >
          <LinearGradient
            colors={['#FF9A8B', '#FF6B95']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          {isPlacingOrder ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.orderButtonText}>Proceed to payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginBottom: 90
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 5
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },
  scrollContent: {
    paddingBottom: 100
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  section: {
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  haveAccountText: {
    fontSize: 14,
    color: '#555'
  },
  loginLink: {
    fontSize: 14,
    color: '#FF6B95',
    fontWeight: '700'
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    marginTop: 10
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  inputMultiline: {
    height: 90,
    textAlignVertical: 'top'
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    maxWidth: '80%'
  },
  itemMeta: {
    fontSize: 13,
    color: '#777'
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6B95',
    fontWeight: 'bold'
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  totalLabel: {
    fontSize: 14,
    color: '#666'
  },
  totalValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  grand: {
    marginTop: 5
  },
  grandLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  grandValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B95'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orderButton: {
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  // Progress bar styles
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleActive: {
    backgroundColor: '#FF6B95'
  },
  stepNumber: {
    color: '#888',
    fontWeight: 'bold'
  },
  stepNumberActive: {
    color: '#fff'
  },
  stepLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'center'
  },
  stepLabelActive: {
    color: '#FF6B95',
    fontWeight: '600'
  },
  progressLine: {
    height: 2,
    backgroundColor: '#FF6B95',
    flex: 0.5,
    marginHorizontal: 5,
  },
});

export default CheckoutScreen;
