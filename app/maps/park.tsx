import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import BasicButton from '@/components/BasicButton';

const moveToLibrary = () => {
  router.replace("maps/library");
};

const moveToPark = () => {
  router.replace("maps/park");
};

const moveToMuseum = () => {
  router.replace("maps/museum");
};

const ParkScreen: React.FC = () => {
  const [parks, setParks] = useState([]);
  const [visibleParks, setVisibleParks] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
      } catch (error) {
        alert('Failed to get user location');
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
      const cleanedData = data.map((park, index) => ({
        id: `${park.LATITUDE}-${park.LONGITUDE}-${index}`,
        name: park.P_PARK,
        latitude: parseFloat(park.LATITUDE),
        longitude: parseFloat(park.LONGITUDE)
      })).filter(park => park.latitude && park.longitude);
      setParks(cleanedData);
    } catch (error) {
      console.error('Failed to fetch Seoul park data', error);
    }
  };

  const onRegionChangeComplete = (region) => {
    const visible = parks.filter(park =>
      park.latitude >= region.latitude - region.latitudeDelta / 2 &&
      park.latitude <= region.latitude + region.latitudeDelta / 2 &&
      park.longitude >= region.longitude - region.longitudeDelta / 2 &&
      park.longitude <= region.longitude + region.longitudeDelta / 2
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
              coordinate={userLocation}
              title="Current Location"
              pinColor="red"
            />
          )}
          {visibleParks.map((park) => (
            <Marker
              key={park.id}
              coordinate={{
                latitude: park.latitude,
                longitude: park.longitude
              }}
              title={park.name}
              pinColor="green"
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
        keyExtractor={item => item.id}
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
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});

export default ParkScreen;
