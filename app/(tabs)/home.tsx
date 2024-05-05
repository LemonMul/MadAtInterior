import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

const MapPage: React.FC = () => {
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
  }, []);

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
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapPage;
