import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '@/constants/Colors';
import BackButton from '@/components/BackButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

const places = [
  {
    name: '청계천',
    date: '16 July-28 July',
    rating: 4.9,
    people: 32,
    hashtag: '#쾌적한',
    image: require('@/assets/images/borough/Cheonggye.png'),
  },
  {
    name: '종로도서관',
    date: '16 July-28 July',
    rating: 4.8,
    people: 28,
    hashtag: '#공부',
    image: require('@/assets/images/borough/Cheonggye.png'),
  },
  {
    name: '낙산근린공원',
    date: '16 July-28 July',
    rating: 4.8,
    people: 25,
    hashtag: '#공원',
    image: require('@/assets/images/borough/Cheonggye.png'),
  },
];

const DetailBorough = () => {
  const router = useRouter();
  const { district } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Header color={Colors.black} router={router} title={district} />
      <Text style={styles.subTitle}>주간 인기 장소</Text>
      {places.map((place, index) => (
        <View key={index} style={styles.placeContainer}>
          <Image source={place.image} style={styles.placeImage} />
          <View style={styles.placeInfo}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.placeDate}>{place.date}</Text>
            <Text style={styles.placeRating}>⭐ {place.rating}</Text>
            <Text style={styles.placePeople}>
              👥 {place.people} Person Joined
            </Text>
          </View>
          <TouchableOpacity style={styles.hashtagContainer}>
            <Text style={styles.hashtag}>{place.hashtag}</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  placeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeDate: {
    fontSize: 14,
    color: Colors.gray,
  },
  placeRating: {
    fontSize: 14,
    color: Colors.black,
  },
  placePeople: {
    fontSize: 14,
    color: Colors.black,
  },
  hashtagContainer: {
    backgroundColor: '#9370DB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  hashtag: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default DetailBorough;
