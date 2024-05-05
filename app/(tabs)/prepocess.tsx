import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const Page : React.FC = () => {
  const [parks, setParks] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [userLocation, setUserLocation] = useState<any>(null); // 사용자 위치 정보를 저장
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null); // 위치 정보 가져오기 실패 시 오류 메시지 저장

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
      } catch (error) {
        setLocationErrorMsg('Failed to get user location');
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
        ...park,
        LATITUDE: parseFloat(park.LATITUDE),
        LONGITUDE: parseFloat(park.LONGITUDE),
      })).filter((park: any) => park.LATITUDE && park.LONGITUDE);
      setParks(cleanedData);
    } catch (error) {
      console.error('서울 공원 데이터를 가져오는데 실패했습니다', error);
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
      const allData = responses.map(response => response.data.SeoulLibraryTimeInfo.row);
      const libraries = allData.flat().map((lib: any) => ({
        ...lib,
        LATITUDE: parseFloat(lib.XCNTS),
        LONGITUDE: parseFloat(lib.YDNTS)
      }));
      setLibraries(libraries);
    } catch (error) {
      console.error('서울 도서관 데이터를 가져오는데 실패했습니다', error);
    }
  };

  const fetchMuseums = async () => {
    const url = 'https://datasets-server.huggingface.co/rows?dataset=hscrown%2Fseoul_museums&config=default&split=train&offset=0&length=100';
  
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data && data.rows) { // "rows" 키에서 데이터를 확인
        const cleanedData = data.rows.map((item: any) => ({
          name: item.row['시설명'], // "시설명" 필드 사용
          LATITUDE: parseFloat(item.row['위도']),
          LONGITUDE: parseFloat(item.row['경도']),
        })).filter((museum: any) => museum.LATITUDE && museum.LONGITUDE);
        setMuseums(cleanedData);
      } else {
        console.error('예상한 데이터 구조와 다릅니다:', data);
      }
    } catch (error) {
      console.error('서울 박물관 데이터를 가져오는데 실패했습니다', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 37.5665,
          longitude: userLocation ? userLocation.longitude : 126.978,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="현재 사용자 위치"
            pinColor="red" // 사용자 위치는 빨간색으로 표시
          />
        )}
        <Marker
          coordinate={{ 
            latitude: 37.5665, 
            longitude: 126.978 
          }}
          title="서울시청역"
          pinColor="blue" // 서울시청역은 파란색으로 표시
        />
        {parks.map((park, index) => (
          <Marker
            key={`park-${index}`}
            coordinate={{
              latitude: park.LATITUDE,
              longitude: park.LONGITUDE
            }}
            title={park.P_PARK}
            pinColor="blue" // 공원은 파란색으로 표시
          />
        ))}
        {libraries.map((library, index) => (
          <Marker
            key={`library-${index}`}
            coordinate={{
              latitude: library.LATITUDE,
              longitude: library.LONGITUDE
            }}
            title={library.LBRRY_NAME}
            pinColor="purple" // 도서관은 보라색으로 표시
          />
        ))}
        {museums.map((museum, index) => (
          <Marker
            key={`museum-${index}`}
            coordinate={{
              latitude: museum.LATITUDE,
              longitude: museum.LONGITUDE
            }}
            title={museum.name}
            pinColor="orange" // 박물관은 주황색으로 표시
          />
        ))}
      </MapView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0 // Updated padding to 0 since the map typically occupies full screen
  },
  map: {
    width: '100%', // Ensures the map takes up the full width of the container
    height: '100%' // Ensures the map takes up the full height of the container
  }
});
