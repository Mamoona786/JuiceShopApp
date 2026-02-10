import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '../components/Slider';
import data from '../assets/data.json';
import CategoryItem from '../components/CategoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import juiceImages from '../assets/juiceImages';

const bannerImages = [
  'https://t4.ftcdn.net/jpg/06/68/54/53/240_F_668545338_nfJtpe1tJssOekBUgHWuybhZ8wNitI33.jpg',
  'https://t4.ftcdn.net/jpg/06/68/54/85/240_F_668548531_yw0KkC7CgIgk5HWiG5fE3WGZMjt6IaOp.jpg',
  'https://as2.ftcdn.net/v2/jpg/06/68/54/85/1000_F_668548542_iLlfZ9bFDhXcF5uwVPzYF5PbZpSx30nC.jpg',
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [juices, setJuices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load data from JSON
    setJuices(data.juices);
    setCategories(['All', ...data.categories.map(c => c.name)]);
  }, []);

  const getFilteredJuices = () => {
  let filtered = juices;

  if (selectedCategory !== 'All') {
    // First filter by category
    filtered = filtered.filter(j => j.category === selectedCategory);

    // Then create size variations for each juice
    filtered = filtered.flatMap(juice => {
      return Object.entries(juice.sizes).map(([size, price]) => ({
        ...juice,
        id: `${juice.id}-${size}`, // Create unique ID for each size
        size: size,
        price: price,
        image: juice.sizeImages[size], // Use the size-specific image
        originalJuice: juice // Keep reference to original juice
      }));
    });
  }

  if (searchQuery) {
    filtered = filtered.filter(j =>
      j.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filtered;
};

  const addToCart = async (item) => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    let cartItems = existingCart ? JSON.parse(existingCart) : [];

    // Determine size and price
    let size = item.size;
    let price = item.price;

    // Handle case where size/price is undefined (All Juices tab)
    if (!size || !price) {
      size = 'S';
      price = item.sizes?.[size] ?? item.originalJuice?.sizes?.[size] ?? 0;
    }

    // Convert image to key string
    const imageKey = typeof item.image === 'string'
      ? item.image
      : Object.keys(juiceImages).find(key => juiceImages[key] === item.image) || 'all-icon.jpeg';

    const itemId = `${item.id}-${size}`;

    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === itemId);

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      const cartItem = {
        id: itemId,
        name: item.name,
        image: imageKey,
        size,
        price,
        quantity: 1,
        originalJuice: item.originalJuice || item
      };
      cartItems.push(cartItem);
    }

    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    alert(`${item.name} (${size}) added to cart!`);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

  const filteredJuices = getFilteredJuices();
  const popularJuices = juices.filter(j => j.popular);

  const renderRatingStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={14} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half" size={14} color="#FFD700" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-outline" size={14} color="#FFD700" />);
    }

    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const renderSizeOptions = (juice) => {
  return Object.entries(juice.sizes).map(([size, price]) => (
    <View
      key={size}
      style={[styles.sizeOption, { backgroundColor: juice.color }]}
    >
      <Text style={styles.sizeText}>{size}</Text>
      <Text style={styles.sizePrice}>Rs. {price}</Text>
    </View>
  ));
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
       {/* Full-width Juice Shop Banner */}
<Image
  source={{ uri: 'https://i.pinimg.com/1200x/66/85/d5/6685d57d28f15df4b8f996c0e267a625.jpg' }}
  style={styles.fullWidthBanner}
  resizeMode="cover"
/>

{/* Header Text Below Banner */}
<View style={styles.headerContainer}>
  <LinearGradient
    colors={['#FF9A8B', '#FF6B95']}
    style={styles.headerGradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <Text style={styles.header}>JuiceShop</Text>
    <Text style={styles.subHeader}>Fresh & Natural</Text>
  </LinearGradient>
</View>

        {/* Carousel */}
          <Slider images={bannerImages} />

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search juices..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Tabs */}
        <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.categoriesContainer}
>
  {categories.map((cat) => (
    <CategoryItem
      key={cat}
      category={cat}
      isActive={selectedCategory === cat}
      onPress={() => setSelectedCategory(cat)}
    />
  ))}
</ScrollView>

        {/* Popular Juices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Juices</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularJuices}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('ProductDetail', { product: item })}
  >
    <View style={[styles.cardBadge, { backgroundColor: item.color }]}>
      <Text style={styles.badgeText}>Popular</Text>
    </View>
    <Image
      source={juiceImages[item.image]}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.name}>{item.name}</Text>
      {renderRatingStars()}
      <View style={styles.sizeOptionsContainer}>
        {renderSizeOptions(item)}
      </View>
    </View>
  </TouchableOpacity>
)}
        />

        {/* All Juices */}
<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>All Juices</Text>
  <TouchableOpacity>
    <Text style={styles.seeAll}>See All</Text>
  </TouchableOpacity>
</View>
<FlatList
  data={filteredJuices}
  horizontal
  keyExtractor={(item) => item.id.toString()}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.horizontalList}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', {
        product: item.originalJuice || item
      })}
    >
      <Image
        source={juiceImages[item.image]}
        style={selectedCategory === 'All' ? styles.image : styles.filteredJuiceImage}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.name}>
          {selectedCategory === 'All' ? item.name : `${item.name} (${item.size})`}
        </Text>
        {renderRatingStars()}
        <Text style={styles.price}>
  Rs. {selectedCategory === 'All' ? item.sizes?.S ?? item.price : item.price}
</Text>

        {/* Gradient Add to Cart button for All Juices */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <LinearGradient
            colors={['#FF9A8B', '#FF6B95']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={[styles.addButtonText, { textAlign: 'center', paddingVertical: 8 }]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )}
/>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffebf3',
    paddingBottom: 20,
  },
  fullWidthBanner: {
  width: '120%',
  marginLeft: -30,
  height: 100, // Adjust height as needed
  marginTop: 30,
},
headerContainer: {
  marginTop: -10, // Space between banner and header
  marginBottom: 20,
},
  headerContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
},
  // headerContainer: {
  //   marginTop: 30,
  //   marginBottom: 20,
  // },
  headerGradient: {
    padding: 20,
    // paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subHeader: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  activeTab: {
    backgroundColor: '#FF6B95',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#FF6B95',
    fontWeight: '500',
  },
  horizontalList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 160,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
    marginBottom: 5,
  },
  cardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  image: {
    width: '80%',
    height: 190,
    marginLeft: 20,
  },
  filteredJuiceImage: {
    width: '40%',
    height: 190,
    marginLeft: 50,
    marginTop: 15,
  },
  cardBody: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sizeOption: {
  borderRadius: 12,
  paddingVertical: 4,
  paddingHorizontal: 8,
  alignItems: 'center',
  marginRight: 4,
},
  sizeText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: 'bold',
  zIndex: 1, // Ensure text appears above gradient
},
sizePrice: {
  color: '#fff',
  fontSize: 10,
  zIndex: 1, // Ensure text appears above gradient
},
  floatingCart: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 10,
  },
  cartGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B95',
  },
  cartBadgeText: {
    color: '#FF6B95',
    fontSize: 12,
    fontWeight: 'bold',
  },
categoriesContainer: {
  paddingHorizontal: 20,
  paddingVertical: 15,
},
price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  addButton: {
  borderRadius: 10,
  paddingVertical: 8,
  alignItems: 'center',
  marginTop: 5,
  overflow: 'hidden', // Add this to contain the gradient
},
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
