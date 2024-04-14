import {
  Image,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { GroupType } from '@/types/CompanyType';
import Colors from '@/constants/Colors';

const GroupListings = ({ listings }: { listings: GroupType[] }) => {
  const renderItem: ListRenderItem<GroupType> = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View></View>
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.title}>인테리어 업체 목록</Text>
      <FlatList
        data={listings}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GroupListings;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.black,
    margin: 10,
  },
});
