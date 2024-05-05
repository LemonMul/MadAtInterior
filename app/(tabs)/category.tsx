import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; 

const Page = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5665,   // 서울의 위도
          longitude: 126.9780, // 서울의 경도
          latitudeDelta: 0.0922, // 지도의 위도 범위
          longitudeDelta: 0.0421, // 지도의 경도 범위
        }}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',  // 지도의 너비
        height: '100%'  // 지도의 높이
    }
});