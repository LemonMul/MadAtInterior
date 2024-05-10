import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';

const placeFinish = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={require('@/assets/images/buttonPurple.png')}
          style={styles.buttonBackground}
        />
        <Text style={styles.buttonText}>좋아요!</Text>
      </View>
      <Text style={styles.title}>서서울공원에서 좋은 하루 보내세요!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/place/lake.png')}
          style={styles.placeImage}
        />
      </View>
      <Image
        source={require('@/assets/images/finishFace.png')}
        style={styles.finishFace}
      />
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
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
  },

  infoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonBackground: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
  },
  buttonText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeImage: {
    width: 300,
    height: 180,
    resizeMode: 'cover',
  },
  finishFace: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default placeFinish;
