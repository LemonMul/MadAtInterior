//필요1))공원+ 내위치

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
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

const Page: React.FC = () => {
  const [parks, setParks] = useState([]);
  const [visibleParks, setVisibleParks] = useState([]);
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
    fetchParks();
  }, []);

  const fetchParks = async () => {
    const seoul_key = '57524f76506d656e3732636a52457a';
    const url = `http://openAPI.seoul.go.kr:8088/${seoul_key}/json/SearchParkInfoService/1/1000/`;

    try {
      const response = await axios.get(url);
      const data = response.data.SearchParkInfoService.row;
      const cleanedData = data.map((park: any) => ({
        name: park.P_PARK,
        LATITUDE: parseFloat(park.LATITUDE),
        LONGITUDE: parseFloat(park.LONGITUDE),
      })).filter((park: any) => park.LATITUDE && park.LONGITUDE);
      setParks(cleanedData);
    } catch (error) {
      console.error('Failed to fetch Seoul park data', error);
    }
  };

  const onRegionChangeComplete = (region: Region) => {
    const visible = parks.filter(park =>
      park.LATITUDE >= region.latitude - region.latitudeDelta / 2 &&
      park.LATITUDE <= region.latitude + region.latitudeDelta / 2 &&
      park.LONGITUDE >= region.longitude - region.longitudeDelta / 2 &&
      park.LONGITUDE <= region.longitude + region.longitudeDelta / 2
    );
    setVisibleParks(visible);
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
          {parks.map((park, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: park.LATITUDE,
                longitude: park.LONGITUDE
              }}
              title={park.name}
              pinColor="green" // Use green for parks
            />
          ))}
        </MapView>
      )}
      <View style={[styles.buttonContainer, {backgroundColor: Colors.white, justifyContent: 'space-between', paddingHorizontal: 5}]}>
        <BasicButton style={{width: 110}} text="도서관" onPress={moveToLibrary}></BasicButton>
        <BasicButton style={{width: 110}} text="공원" onPress={moveToPark}></BasicButton>
        <BasicButton style={{width: 110}} text="박물관" onPress={moveToMuseum}></BasicButton>
      </View>
      <FlatList
        data={visibleParks}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem}>
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
    height: '60%'
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
  }, buttonContainer: {
    flexDirection: 'row'
  }
});

export default Page;
