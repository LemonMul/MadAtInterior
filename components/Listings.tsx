import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { ListingType } from "@/types/listingType";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  listings: any[];
};

const Listings = ({ listings }: Props) => {
  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.bookmark}>
            <Ionicons name="bookmark-outline" size={20} color={Colors.white} />
          </View>
          <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={listings}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
    position: "absolute",
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
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
});
