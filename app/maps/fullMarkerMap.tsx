import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
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
  const [libraries, setLibraries] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [visibleParks, setVisibleParks] = useState([]);
  const [visibleLibraries, setVisibleLibraries] = useState([]);
  const [visibleMuseums, setVisibleMuseums] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationErrorMsg('위치 정보 접근 권한이 거부되었습니다');
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
        setLocationErrorMsg('사용자 위치를 가져오는 데 실패했습니다');
      }
    })();
    fetchParks();
    fetchLibraries();
    fetchMuseums();
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
        color: 'green'
      })).filter((park: any) => park.LATITUDE && park.LONGITUDE);
      setParks(cleanedData);
    } catch (error) {
      console.error('서울 공원 데이터를 가져오는 데 실패했습니다', error);
    }
  };

  const fetchLibraries = async () => {
    const api_key = '57524f76506d656e3732636a52457a';
    const urls = [
      `http://openAPI.seoul.go.kr:8088/${api_key}/json/SeoulLibraryTimeInfo/1/1000/`,
      `http://openAPI.seoul.go.kr:8088/${api_key}/json/SeoulLibraryTimeInfo/1001/2000/`
    ];
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      const allData = responses.flatMap(response => response.data.SeoulLibraryTimeInfo.row);
      const cleanedData = allData.map((lib: any) => ({
        name: lib.LBRRY_NAME,
        LATITUDE: parseFloat(lib.XCNTS),
        LONGITUDE: parseFloat(lib.YDNTS),
        color: 'purple'
      })).filter((library: any) => library.LATITUDE && library.LONGITUDE);
      setLibraries(cleanedData);
    } catch (error) {
      console.error('서울 도서관 데이터를 가져오는 데 실패했습니다', error);
    }
  };

  const fetchMuseums = async () => {
    const url = 'https://datasets-server.huggingface.co/rows?dataset=hscrown%2Fseoul_museums&config=default&split=train&offset=0&length=100';
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data && data.rows) {
        const cleanedData = data.rows.map((item: any) => ({
          name: item.row['시설명'],
          LATITUDE: parseFloat(item.row['위도']),
          LONGITUDE: parseFloat(item.row['경도']),
          color: 'orange'
        })).filter((museum: any) => museum.LATITUDE && museum.LONGITUDE);
        setMuseums(cleanedData);
      } else {
        console.error('예상한 데이터 구조와 다릅니다:', data);
      }
    } catch (error) {
      console.error('서울 박물관 데이터를 가져오는 데 실패했습니다', error);
    }
  };

  const onRegionChangeComplete = (region: Region) => {
    setVisibleParks(parks.filter(park =>
      park.LATITUDE >= region.latitude - region.latitudeDelta / 2 &&
      park.LATITUDE <= region.latitude + region.latitudeDelta / 2 &&
      park.LONGITUDE >= region.longitude - region.longitudeDelta / 2 &&
      park.LONGITUDE <= region.longitude + region.longitudeDelta / 2
    ));
    setVisibleLibraries(libraries.filter(library =>
      library.LATITUDE >= region.latitude - region.latitudeDelta / 2 &&
      library.LATITUDE <= region.latitude + region.latitudeDelta / 2 &&
      library.LONGITUDE >= region.longitude - region.longitudeDelta / 2 &&
      library.LONGITUDE <= region.longitude + region.longitudeDelta / 2
    ));
    setVisibleMuseums(museums.filter(museum =>
      museum.LATITUDE >= region.latitude - region.latitudeDelta / 2 &&
      museum.LATITUDE <= region.latitude + region.latitudeDelta / 2 &&
      museum.LONGITUDE >= region.longitude - region.longitudeDelta / 2 &&
      museum.LONGITUDE <= region.longitude + region.longitudeDelta / 2
    ));
  };

  const visiblePlaces = visibleParks.concat(visibleLibraries, visibleMuseums);

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
              title="현재 위치"
              pinColor="red"
            />
          )}
          {visibleParks.map((park, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: park.LATITUDE,
                longitude: park.LONGITUDE
              }}
              title={park.name}
              pinColor={park.color}
            />
          ))}
          {visibleLibraries.map((library, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: library.LATITUDE,
                longitude: library.LONGITUDE
              }}
              title={library.name}
              pinColor={library.color}
            />
          ))}
          {visibleMuseums.map((museum, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: museum.LATITUDE,
                longitude: museum.LONGITUDE
              }}
              title={museum.name}
              pinColor={museum.color}
            />
          ))}
        </MapView>
      )}
    
      <View style={[styles.buttonContainer, {backgroundColor: Colors.white, justifyContent: 'space-between', paddingHorizontal: 5}]}>
        <BasicButton style={{width: 110}} text="도서관" onPress={moveToLibrary}></BasicButton>
        <BasicButton style={{width: 110}} text="공원" onPress={moveToLibrary}></BasicButton>
        <BasicButton style={{width: 110}} text="박물관" onPress={moveToLibrary}></BasicButton>
      </View>
      {visiblePlaces.length > 0 ? (
        <FlatList
          data={visiblePlaces}
          keyExtractor={(item, index) => `place-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.listItemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      ) : (
       <></>
      )}
    
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
    height: '30%',
    backgroundColor: '#fff'
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  listItemText: {
    fontSize: 16
  },
  noDataText: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center'
  }, buttonContainer: {
    flexDirection: 'row'
  }
});

export default Page;
