import { FlatList, StyleSheet, Text, View, ListRenderItem } from "react-native";
import React from "react";
import { ListingType } from "@/types/listingType";

type Props = {
  listings: any[];
};

const Listings = ({ listings }: Props) => {
  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={listings} renderItem={renderItems} />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({});
