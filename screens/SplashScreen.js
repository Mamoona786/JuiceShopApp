import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start all animations together
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: 3000, // 3 seconds for progress to complete
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ]).start(({ finished }) => {
      if (finished) {
        // Navigate to HomeScreen after animations complete
        // In SplashScreen.js
navigation.replace('MainApp', { screen: 'Home' });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.background}
        resizeMode="cover"
        blurRadius={2}
      >
        <View style={styles.overlay} />

        <Animated.View style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}>
          <Text style={styles.title}>Sip the Freshness</Text>
          <Text style={styles.subtitle}>Feel the Energy</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>Premium Beverages Crafted with Care</Text>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.loadingText}>Loading...</Text>
          <View style={styles.progressBarContainer}>
            <Animated.View style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                })
              }
            ]} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '80%',
    marginBottom: 40, // Added space between content and progress bar
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  subtitle: {
    fontSize: 24,
    color: '#f8f8f8',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 15,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#ddd',
    fontWeight: '300',
    letterSpacing: 1.5,
    marginTop: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  divider: {
    height: 2,
    width: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBarContainer: {
    width: '60%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;
