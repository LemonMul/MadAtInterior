import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import BackButton from '@/components/BackButton';
import FlaskConfig from '@/flask.config';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({});
  const lat = 37.5665;
  const long = 126.978;

  useEffect(() => {
    console.log('Component mounted, starting to fetch weather data...');
    loadWeatherPlaces(lat, long);
  }, []);

  const loadWeatherPlaces = (lat, long) => {
    console.log(
      `Fetching weather data for latitude: ${lat}, longitude: ${long}`
    );
    fetch(
      `http://${FlaskConfig.Private_IP_Address}:${FlaskConfig.weather}/weather?latitude=${lat}&longitude=${long}`
    )
      .then((response) => {
        console.log('Received response from server...');
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Processing data...', data);
        if (data.error) {
          throw new Error(data.error);
        }
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  const moveToPlace = () => {
    router.replace('weathers/moreRecommendation');
  };

  const moveToFinish = () => {
    router.replace('weathers/weatherFinish');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/weather/ELib.png')}
          style={styles.libraryImage}
        />
      </View>
      <Text style={styles.title}>{weatherData.name}</Text>
      <Text style={styles.subtitle}>오늘은 날씨가 {weatherData.sky}!</Text>
      <Text style={styles.subtitle}>이곳은 어떨까요?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={moveToFinish}
        >
          <Text style={styles.buttonText}>좋아요!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.dislikeButton]}
          onPress={moveToPlace}
        >
          <Text style={styles.buttonText}>별로에요!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeatherDashboard;

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
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  libraryImage: {
    width: 300,
    height: 180,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    backgroundColor: Colors.blue,
  },
  dislikeButton: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
  },
});
