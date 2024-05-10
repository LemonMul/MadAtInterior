import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import BackButton from '@/components/BackButton';

const moveToPlace = () => {
  router.replace('place/placeFirst');
};

const moreRecommendation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <Text style={styles.title}>다른 추천 장소를 받아보시겠어요?</Text>
      <Image
        source={require('@/assets/images/zoom.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.startButton} onPress={moveToPlace}>
        <Image
          source={require('@/assets/images/buttonPurple.png')}
          style={styles.buttonBackground}
        />
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  startButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBackground: {
    width: 250,
    height: 60,
    resizeMode: 'contain',
  },
  startButtonText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default moreRecommendation;
