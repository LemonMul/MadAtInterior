//필요3)) 박물관마커 + 내위치 + 상세페이지

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import BasicButton from '@/components/BasicButton';
const moveToLibrary = () => {
  router.replace("maps/library");
}
const moveToPark = () => {
  router.replace("maps/park");
}

const moveToMuseum = () => {
  router.replace("maps/museum");
}

const moveToPlace = () => {
  
};

const MuseumScreen: React.FC = () => {
  const [museums, setMuseums] = useState([]);
  const [visibleMuseums, setVisibleMuseums] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
      } catch (error) {
        setLocationErrorMsg('Failed to get user location');
      }
    })();
    fetchMuseums();
  }, []);

  const fetchMuseums = async () => {
    const url = 'https://datasets-server.huggingface.co/rows?dataset=hscrown%2Fseoul_museums&config=default&split=train&offset=0&length=100';
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data && data.rows) {
        const cleanedData = data.rows.map((item) => ({
          name: item.row['시설명'],
          latitude: parseFloat(item.row['위도']),
          longitude: parseFloat(item.row['경도']),
        })).filter(museum => museum.latitude && museum.longitude);
        setMuseums(cleanedData);
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Failed to fetch Seoul museum data', error);
    }
  };

  const onRegionChangeComplete = (region: Region) => {
    const visible = museums.filter(museum =>
      museum.latitude >= region.latitude - region.latitudeDelta / 2 &&
      museum.latitude <= region.latitude + region.latitudeDelta / 2 &&
      museum.longitude >= region.longitude - region.longitudeDelta / 2 &&
      museum.longitude <= region.longitude + region.longitudeDelta / 2
    );
    setVisibleMuseums(visible);
  };

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Current Location"
              pinColor="red"
            />
          )}
          {visibleMuseums.map((museum, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: museum.latitude,
                longitude: museum.longitude
              }}
              title={museum.name}
              pinColor="orange"
            />
          ))}
        </MapView>
      )}
      <View style={[styles.buttonContainer, {backgroundColor: Colors.white, justifyContent: 'space-between', paddingHorizontal: 5}]}>
        <BasicButton style={{width: 90}} text="도서관" onPress={moveToLibrary}></BasicButton>
        <BasicButton style={{width: 90}} text="공원" onPress={moveToPark}></BasicButton>
        <BasicButton style={{width: 90}} text="박물관" onPress={moveToMuseum}></BasicButton>
        <BasicButton style={{width: 90}} text="청년공간" onPress={moveToPlace}></BasicButton>
      </View>
      <FlatList
        data={visibleMuseums}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => {
            const encodedName = encodeURIComponent(item.name);
            const url = `https://www.google.com/maps/search/?api=1&query=${encodedName}`;
            Linking.openURL(url);
          }}>
            <Text style={styles.listItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  map: {
    height: '70%'
  },
  list: {
    height: '30%'
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  listItemText: {
    fontSize: 16
  },buttonContainer: {
    flexDirection: 'row'
  }
});

export default MuseumScreen;
