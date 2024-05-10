import BackButton from '@/components/BackButton';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const moveToLoading = () => {
  router.replace('weathers/weatherLoading');
};

const WeatherSearch = () => {
  const weatherData = [
    {
      temp: '13°',
      location: '서울시, 은평구',
      high: '16',
      low: '8',
      label: '비',
      image: require('@/assets/images/weather/Rain.png'),
    },
    {
      temp: '22°',
      location: '서울시, 중구',
      high: '21',
      low: '19',
      label: '흐림',
      image: require('@/assets/images/weather/Cloud.png'),
    },
    {
      temp: '19°',
      location: '서울시, 서대문구',
      high: '20',
      low: '16',
      label: '약간 비',
      image: require('@/assets/images/weather/LittleRain.png'),
    },
    {
      temp: '18°',
      location: '서울시, 동작구',
      high: '21',
      low: '15',
      label: '약간 비',
      image: require('@/assets/images/weather/LittleRain.png'),
    },
    {
      temp: '21°',
      location: '서울시, 중랑구',
      high: '26',
      low: '16',
      label: '약간 비',
      image: require('@/assets/images/weather/LittleRain.png'),
    },
  ];

  const WeatherItem = ({ temp, location, high, low, label, image }) => (
    <View style={styles.weatherItemContainer}>
      <ImageBackground
        source={require('@/assets/images/weather/WeatherRectangle.png')}
        resizeMode="contain"
        style={styles.weatherBackground}
      >
        <Image source={image} style={styles.weatherIcon} />
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherTemp}>{temp}</Text>
          <Text style={styles.weatherHighLow}>{`H:${high}° L:${low}°`}</Text>
          <Text style={styles.weatherLocation}>{location}</Text>
          <Text style={styles.weatherLabel}>{label}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Text style={styles.title}>날씨</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="구 이름으로 검색해주세요 ..."
            placeholderTextColor="#B0B0B0"
          />
          <TouchableOpacity onPress={moveToLoading}>
            <FontAwesome
              name={'search'}
              size={25}
              color={Colors.gray}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {weatherData.map((item, index) => (
        <WeatherItem key={index} {...item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    paddingTop: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    color: '#346beb',
    marginBottom: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  inputIcon: {
    marginTop: 5,
    marginRight: 10,
  },
  searchBar: {
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  weatherItemContainer: {
    marginBottom: 10,
    height: 200,
  },
  weatherBackground: {
    height: '100%',
  },
  weatherIcon: {
    width: 130,
    height: 130,
    position: 'absolute',
    right: 30,
    top: 0,
  },
  weatherInfo: {
    marginLeft: 20,
    marginTop: 20,
  },
  weatherTemp: {
    fontSize: 45,
    color: Colors.white,
  },
  weatherHighLow: {
    fontSize: 18,
    color: Colors.white,
    marginVertical: 5,
  },
  weatherLocation: {
    fontSize: 16,
    color: Colors.white,
  },
  weatherLabel: {
    fontSize: 16,
    color: Colors.white,
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
});

export default WeatherSearch;
