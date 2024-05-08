//박물관
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
  const [museums, setMuseums] = useState([]);
  const [visibleMuseums, setVisibleMuseums] = useState([]);
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
          latitudeDelta: 0.0922, // 원하는 지도 배율
          longitudeDelta: 0.0421  // 원하는 지도 배율
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
        const cleanedData = data.rows.map((item: any) => ({
          name: item.row['시설명'],
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

  const onRegionChangeComplete = (region: Region) => {
    const visible = museums.filter(museum => 
      museum.LATITUDE >= region.latitude - region.latitudeDelta / 2 &&
      museum.LATITUDE <= region.latitude + region.latitudeDelta / 2 &&
      museum.LONGITUDE >= region.longitude - region.longitudeDelta / 2 &&
      museum.LONGITUDE <= region.longitude + region.longitudeDelta / 2
    );
    setVisibleMuseums(visible);
  };

  return (
    <View style={styles.container}>
      {initialRegion && ( // 초기 지도 영역이 설정되었는지 확인
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
          {museums.map((museum, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: museum.LATITUDE,
                longitude: museum.LONGITUDE
              }}
              title={museum.name}
              pinColor="orange"
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
        data={visibleMuseums}
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
