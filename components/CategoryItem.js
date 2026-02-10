import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ category, isActive, onPress }) => {
  const navigation = useNavigation();

  const categoryImages = {
    All: require('../assets/images/all-icon.jpeg'),
    Mango: require('../assets/images/mango-icon.jpeg'),
    Berry: require('../assets/images/berry-icon.jpeg'),
    Kiwi: require('../assets/images/kiwi-icon.jpeg'),
    Strawberry: require('../assets/images/strawberry-icon.jpeg'),
    Grape: require('../assets/images/grape-icon.jpeg'),
    Banana: require('../assets/images/banana-icon.jpeg'),
    Apple: require('../assets/images/apple-icon.jpeg'),
    Watermelon: require('../assets/images/watermelon-icon.jpeg'),
    Orange: require('../assets/images/orange-icon.jpeg')
  };

  const handlePress = () => {
    console.log('Category pressed:', category);

    if (category === 'All') {
      onPress();
    } else {
      // ✅ THIS IS THE CORRECT LINE
      navigation.navigate('CategoryProducts', { category });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={categoryImages[category] || categoryImages['All']}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={[styles.text, isActive && styles.activeText]}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
  },
  activeContainer: {
    opacity: 1,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f1f1f1',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeText: {
    color: '#FF6B95',
    fontWeight: '600',
  },
});

export default CategoryItem;
