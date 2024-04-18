import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import listingData from '@/data/case.json';
import { ListingType } from '@/types/listingType';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingDetails = () => {
  const { id } = useLocalSearchParams();
  const listing: ListingType | undefined = (listingData as ListingType[]).find(
    (item) => item.id === id
  );

  const router = useRouter();
  if (listing) {
    return (
      <>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: Colors.gray,
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.white,
                    padding: 6,
                    borderRadius: 10,
                  }}
                >
                  <Feather name="arrow-left" size={20} />
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: Colors.gray,
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.white,
                    padding: 6,
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="bookmark-outline" size={20} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.container}>
          <Image source={{ uri: listing.image }} style={styles.image} />
          <View style={styles.contentWrapper}>
            <Text style={styles.listingName}>{listing.name}</Text>
            <View style={styles.listingLocationWrapper}>
              <FontAwesome5
                name="map-marker-alt"
                size={18}
                color={Colors.primaryColor}
              />
              <Text style={styles.listingLocationTxt}>{listing.location}</Text>
            </View>
          </View>
        </View>
      </>
    );
  } else {
    return <Text>데이터 로드 실패</Text>;
  }
};

export default ListingDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  contentWrapper: { padding: 20 },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  listingName: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.black,
    letterSpacing: 0.5,
  },
  listingLocationWrapper: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  listingLocationTxt: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.black,
  },
});
