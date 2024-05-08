// 박물관 위치마커 + 구 나누기 


import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout, Polygon } from 'react-native-maps';
import axios from 'axios';
import randomColor from 'randomcolor';  // 랜덤 색상 생성 라이브러리


interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

interface DistrictData {
  geometry: {
    coordinates: Array<Array<[number, number]>>
  };
  color: string;
}

const MapScreen: React.FC = () => {
  // 마커 및 지구구역 데이터를 상태로 관리
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);

  useEffect(() => {
    // 로컬 JSON 파일에서 미술관 데이터 로드
    const markerData = require('../../assets/museum.json');

    // JSON 데이터를 파싱하여 마커 데이터 생성
    const parsedMarkers: MarkerData[] = markerData.map((item: any, index: number) => {
      const latitude = parseFloat(item.위도);
      const longitude = parseFloat(item.경도);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        return {
          id: index.toString(),
          latitude: latitude,
          longitude: longitude,
          title: item.시설명,
          description: item.운영기관전화번호
        };
      }
      return null;
    }).filter((marker: MarkerData | null) => marker);

    setMarkers(parsedMarkers);

    // API 호출을 통해 서울의 행정 구역 데이터를 가져옴
    axios.get('https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo_simple.json')
      .then(response => {
        const data = response.data;
        // 각 지구구역에 랜덤 색상을 부여
        const districtsWithColor: DistrictData[] = data.features.map((feature: any, index: number) => ({
          ...feature,
          color: randomColor({ luminosity: 'dark' })
        }));
        setDistricts(districtsWithColor);
      });
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.5665,
        longitude: 126.9780,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {districts.map((district, index) => (
        <Polygon
          key={index.toString()}
          coordinates={district.geometry.coordinates[0].map(coord => ({
            latitude: coord[1],
            longitude: coord[0]
          }))}
          strokeColor={district.color}
          fillColor="transparent"
          strokeWidth={2}
        />
      ))}
      {markers.map((marker: MarkerData) => (
        <Marker
          key={marker.id}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
        >
          <Callout>
            <Text>{marker.title}</Text>
            <Text>{marker.description}</Text>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default MapScreen;
