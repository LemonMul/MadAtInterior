//  필요)) 도서관 마커 + 내위치 마커
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const Page: React.FC = () => {
  const [libraries, setLibraries] = useState([]);
  const [visibleLibraries, setVisibleLibraries] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  const [initialRegion, setInitialRegion] = useState(null); // 초기 지도 영역을 저장할 상태 추가

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
        // 사용자 위치를 기준으로 초기 지도 영역 설정
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
      const cleanedData = allData.flat().map((lib: any) => ({
        name: lib.LBRRY_NAME,
        LATITUDE: parseFloat(lib.XCNTS),
        LONGITUDE: parseFloat(lib.YDNTS)
      })).filter((library: any) => library.LATITUDE && library.LONGITUDE);
      setLibraries(cleanedData);
    } catch (error) {
      console.error('Failed to fetch Seoul library data', error);
    }
  };

  const onRegionChangeComplete = (region) => {
    const visible = libraries.filter(library => 
      library.LATITUDE >= region.latitude - region.latitudeDelta / 2 &&
      library.LATITUDE <= region.latitude + region.latitudeDelta / 2 &&
      library.LONGITUDE >= region.longitude - region.longitudeDelta / 2 &&
      library.LONGITUDE <= region.longitude + region.longitudeDelta / 2
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
                latitude: library.LATITUDE,
                longitude: library.LONGITUDE
              }}
              title={library.name}
              pinColor="purple"
            />
          ))}
        </MapView>
      )}
      <FlatList
        data={visibleLibraries}
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
  }
});

export default Page;
