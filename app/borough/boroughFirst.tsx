import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import BackButton from '@/components/BackButton';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

const districts = [
  { name: '강서구', backgroundColor: '#FF6F61' },
  { name: '양천구', backgroundColor: '#FFA500' },
  { name: '종로구', backgroundColor: '#FFFF99' },
  { name: '영등포구', backgroundColor: '#ADFF2F' },
  { name: '마포구', backgroundColor: '#AFEEEE' },
  { name: '은평구', backgroundColor: '#87CEFA' },
  { name: '서대문구', backgroundColor: '#9370DB' },
  { name: '동작구', backgroundColor: '#EE82EE' },
];

const BoroughFirst = () => {
  const router = useRouter();

  const handleNavigate = (district: string) => {
    router.push({
      pathname: '/borough/detailBorough',
      params: { district },
    });
  };

  return (
    <View style={styles.container}>
      <Header
        color={Colors.black}
        router={router}
        title="서울시 구별 장소 정보"
      />
      <View style={styles.gridContainer}>
        {districts.map((district, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.gridItem,
              { backgroundColor: district.backgroundColor },
            ]}
            onPress={() => handleNavigate(district.name)}
          >
            <Text style={styles.gridText}>{district.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '45%',
    height: 100,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  gridText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default BoroughFirst;
