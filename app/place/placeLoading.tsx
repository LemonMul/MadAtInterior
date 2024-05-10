import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import Header from '@/components/Header';

const moveToCompleted = () => {
  router.replace('place/placeCompleted');
};

const placeLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={require('@/assets/images/place/LoadingFace.png')}
          style={styles.blubImage}
        />
        <Text style={styles.infoTitle}>비슷한 사용자의 이용기록을</Text>
        <Text style={styles.infoTitle}>분석하고 있어요</Text>
        <Text style={styles.infoSubtitle}>
          사용자 평점 및 리뷰 분석을 바탕으로 한
        </Text>
        <Text style={styles.infoSubtitle}>머신러닝 분석을 하고 있어요!</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={moveToCompleted}>
        <Image
          source={require('@/assets/images/buttonPurple.png')}
          style={styles.buttonBackground}
        />
        <Text style={styles.startButtonText}> . . .</Text>
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
    backgroundColor: Colors.purple,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  blubImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoSubtitle: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
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

export default placeLoading;
