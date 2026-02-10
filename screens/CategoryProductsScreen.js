import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import juiceImages from '../assets/juiceImages';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 50) / 2;

const normalizeCategory = (cat) => {
  const map = {
    Grapes: 'grape',
    Strawberries: 'strawberry',
    Berries: 'berry',
    Bananas: 'banana',
    Kiwis: 'kiwi',
    Mangoes: 'mango',
    Apples: 'apple',
    Oranges: 'orange',
    Watermelons: 'watermelon',
  };
  return map[cat] || cat.toLowerCase();
};

const getCategoryColor = (category) => {
  const colors = {
    mango: '#FF9A8B',
    berry: '#FF6B95',
    kiwi: '#4CAF50',
    strawberry: '#FF4081',
    grape: '#9C27B0',
    banana: '#FFC107',
    apple: '#FF6347',
    orange: '#FFA500',
    watermelon: '#F06292',
  };
  return colors[category] || '#FF6B95';
};

const CategoryProductsScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const normalizedCategory = normalizeCategory(category);
  const categoryColor = getCategoryColor(normalizedCategory);

  // Filter images whose filename starts with the normalized category name
  const filteredImages = Object.entries(juiceImages).filter(([key]) =>
    key.toLowerCase().startsWith(normalizedCategory)
  );

  const products = filteredImages.map(([fileName, imageSource], index) => ({
    id: `${normalizedCategory}-${index}`,
    name: `${category} Juice`,
    price: 100 + index * 10,
    image: imageSource,
    color: categoryColor,
  }));

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

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={[styles.imageContainer, { backgroundColor: `${item.color}20` }]}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        {renderRatingStars()}
        <Text style={styles.price}>Rs. {item.price.toFixed(2)}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            // Add to cart logic can be added here
          }}
        >
          <LinearGradient
            colors={['#FF9A8B', '#FF6B95']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#FF9A8B', '#FF6B95']}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.header}>{category} Juices</Text>
            <Text style={styles.subHeader}>Fresh & Natural</Text>
          </LinearGradient>
        </View>

        {/* Product Grid */}
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          renderItem={renderProduct}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffebf3',
    marginTop: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerGradient: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subHeader: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  grid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: CARD_WIDTH,
    margin: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    height: CARD_WIDTH * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
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
    overflow: 'hidden',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CategoryProductsScreen;
