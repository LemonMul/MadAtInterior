// 도서관 + 내위치 + 리스트 + 상세페이지
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
}
const moveToPark = () => {
  router.replace("maps/park");
}

const moveToMuseum = () => {
  router.replace("maps/museum");
}

const HomeScreen: React.FC = () => {
  const [libraries, setLibraries] = useState([]);
  const [visibleLibraries, setVisibleLibraries] = useState([]);
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
        setUserLocation(location.coords);
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
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    const api_key = '57524f76506d656e3732636a52457a';
    const urls = [
      `http://openAPI.seoul.go.kr:8088/${api_key}/json/SeoulLibraryTimeInfo/1/1000/`,
      `http://openAPI.seoul.go.kr:8088/${api_key}/json/SeoulLibraryTimeInfo/1001/2000/`
    ];

    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      const allData = responses.map(response => response.data.SeoulLibraryTimeInfo.row);
      const cleanedData = allData.flat().map((lib, index) => ({
        id: `${lib.XCNTS}-${lib.YDNTS}-${index}`,  // 고유 ID 생성 방식
        name: lib.LBRRY_NAME,
        latitude: parseFloat(lib.XCNTS),
        longitude: parseFloat(lib.YDNTS)
      })).filter(lib => lib.latitude && lib.longitude);
      setLibraries(cleanedData);
    } catch (error) {
      console.error('Failed to fetch library data', error);
    }
  };

  const onRegionChangeComplete = (region) => {
    const visible = libraries.filter(library => 
      library.latitude >= region.latitude - region.latitudeDelta / 2 &&
      library.latitude <= region.latitude + region.latitudeDelta / 2 &&
      library.longitude >= region.longitude - region.longitudeDelta / 2 &&
      library.longitude <= region.longitude + region.longitudeDelta / 2
    );
    setVisibleLibraries(visible);
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
          {libraries.map((library, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: library.latitude,
                longitude: library.longitude
              }}
              title={library.name}
              pinColor="purple"
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
        data={visibleLibraries}
        keyExtractor={item => item.id}  // 고유 ID 사용
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

export default HomeScreen;