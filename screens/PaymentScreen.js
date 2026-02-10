import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import juiceImages from '../assets/juiceImages';

const PaymentScreen = ({ route, navigation }) => {
  const {
   cartItems = [],
   subtotal: routeSubtotal,
   total: legacyTotal,
   deliveryFee: feeFromRoute,
   taxAmount: taxFromRoute,
   grandTotal: totalFromRoute,
 } = route.params || {};

  const subtotal = typeof routeSubtotal === 'number' ? routeSubtotal : (legacyTotal || 0);

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isPaying, setIsPaying] = useState(false);

  const deliveryFee = typeof feeFromRoute === 'number' ? feeFromRoute : 100;
 const tax = typeof taxFromRoute === 'number' ? taxFromRoute : subtotal * 0.05;
 const grandTotal = typeof totalFromRoute === 'number' ? totalFromRoute : subtotal + deliveryFee + tax;


  const onPayNow = async () => {
    try {
      setIsPaying(true);

      const orderId = `ORD-${Date.now()}`;

      const newOrder = {
        orderId,
        cartItems,
        subtotal,
        deliveryFee,
        tax,
        grandTotal,
        paymentMethod: selectedPayment,
        date: new Date().toISOString(),
      };

      const existingOrdersJSON = await AsyncStorage.getItem('orders');
      const existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];

      const updatedOrders = [newOrder, ...existingOrders];
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));

      // clear cart after successful order
      await AsyncStorage.setItem('cartItems', JSON.stringify([]));
     await AsyncStorage.setItem('subtotal', '0');

      navigation.navigate('OrderConfirmationScreen', {
        orderId,
        grandTotal,
      });
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsPaying(false);
    }
  };

  const renderProgressBar = () => {
    const steps = ['Checkout', 'Payment', 'Confirmation'];
    return (
      <View style={styles.progressContainer}>
        {steps.map((step, index) => {
          const isActive = index === 1;
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

  const PaymentOption = ({ icon, title, value }) => (
    <TouchableOpacity
      style={[styles.paymentMethod, selectedPayment === value && styles.selectedPayment]}
      onPress={() => setSelectedPayment(value)}
    >
      <Icon name={icon} size={22} color={selectedPayment === value ? '#FF6B95' : '#777'} />
      <Text style={[styles.paymentText, selectedPayment === value && styles.selectedPaymentText]}>
        {title}
      </Text>
      {selectedPayment === value && (
        <View style={styles.radioSelected}>
          <Icon name="check" size={16} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  const CardForm = () => (
    <View style={styles.cardForm}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Card Holder Name"
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Card Number"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={19}
          style={styles.input}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="MM/YY"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={5}
          style={[styles.input, styles.half]}
        />
        <TextInput
          placeholder="CVV"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={4}
          style={[styles.input, styles.half, { marginLeft: 10 }]}
        />
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    const imageSource = juiceImages[item.image] || require('../assets/images/all-icon.jpeg');
    return (
      <View style={styles.itemRow}>
        <Image source={imageSource} style={styles.itemImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}{item.size ? ` (${item.size})` : ''}
          </Text>
          <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
        </View>
        <Text style={styles.itemPrice}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    );
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
        <Text style={styles.headerText}>Payment</Text>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 24 }}>
        {renderProgressBar()}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="receipt" size={20} color="#FF6B95" />
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>
          <View style={styles.card}>
            <FlatList
              data={cartItems}
              keyExtractor={(it) => String(it.id)}
              renderItem={renderItem}
              scrollEnabled={false}
            />
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>Rs. {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Delivery Fee</Text>
              <Text style={styles.totalValue}>Rs. {deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax</Text>
              <Text style={styles.totalValue}>Rs. {tax.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.totalRow, styles.grand]}>
              <Text style={styles.grandLabel}>Total</Text>
              <Text style={styles.grandValue}>Rs. {grandTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="payment" size={20} color="#FF6B95" />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>

          <PaymentOption icon="credit-card" title="Credit or Debit Card" value="card" />
          {selectedPayment === 'card' && <CardForm />}

          <PaymentOption icon="local-atm" title="Cash on Delivery" value="cash" />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={onPayNow}
          disabled={isPaying}
        >
          <LinearGradient
            colors={['#FF9A8B', '#FF6B95']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          {isPaying ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.payText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', marginBottom: 90 },
  header: {
    marginTop: 30,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: { position: 'absolute', left: 20, padding: 5 },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  content: { flex: 1, paddingHorizontal: 15, paddingTop: 15 },

  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginLeft: 8 },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  progressStep: { alignItems: 'center', flex: 1 },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleActive: { backgroundColor: '#FF6B95' },
  stepNumber: { color: '#888', fontWeight: 'bold' },
  stepNumberActive: { color: '#fff' },
  stepLabel: { fontSize: 12, color: '#888', marginTop: 5, textAlign: 'center' },
  stepLabelActive: { color: '#FF6B95', fontWeight: '600' },
  progressLine: {
    height: 2,
    backgroundColor: '#FF6B95',
    flex: 0.5,
    marginHorizontal: 5,
  },

  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, elevation: 1 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },

  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemImage: { width: 44, height: 44, borderRadius: 8, marginRight: 12 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#333' },
  itemMeta: { fontSize: 12, color: '#777', marginTop: 2 },
  itemPrice: { fontSize: 14, color: '#FF6B95', fontWeight: '700' },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalLabel: { fontSize: 14, color: '#666' },
  totalValue: { fontSize: 14, color: '#333', fontWeight: '500' },
  grand: { marginTop: 6 },
  grandLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  grandValue: { fontSize: 16, fontWeight: 'bold', color: '#FF6B95' },

  paymentMethod: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  selectedPayment: { borderColor: '#FF6B95', backgroundColor: '#FFF9FA' },
  paymentText: { fontSize: 14, color: '#777', marginLeft: 10, flex: 1 },
  selectedPaymentText: { color: '#FF6B95', fontWeight: '600' },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B95',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardForm: {
    marginTop: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  inputRow: { marginBottom: 10 },
  row: { flexDirection: 'row', marginTop: 4 },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  half: { flex: 1 },

  footer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  payButton: {
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PaymentScreen;
