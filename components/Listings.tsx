import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListingType } from '@/types/listingType';
import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type Props = {
  listings: any[];
  category: string;
};

const Listings = ({ listings, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (category === '전체') {
        setFilteredData(listings);
      } else {
        const filtered = listings.filter((item) => item.category === category);
        setFilteredData(filtered);
      }
      setLoading(false);
    }, 200);
  }, [category, listings]);

  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.bookmark}>
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={Colors.white}
              />
            </View>
            <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FontAwesome5
                  name="map-marker-alt"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.itemLocationTxt}>{item.location}</Text>
              </View>
              <Text style={styles.itemCompanyTxt}>{item.company}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={styles.loadingContainer}>
      {loading ? (
        <ActivityIndicator
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size="large"
          color={Colors.primaryColor}
        />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItems}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 220,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
  },
  bookmark: {
    position: 'absolute',
    top: 185,
    right: 30,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  itemLocationTxt: {
    fontSize: 15,
    marginLeft: 5,
  },
  itemCompanyTxt: {
    fontSize: 15,
    color: Colors.primaryColor,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
