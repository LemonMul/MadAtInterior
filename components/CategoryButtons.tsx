import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "@/constants/Colors";
import categories from "@/data/categories";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CategoryButtons = () => {
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => itemRef.current[index] == el}
            onPress={() => handleSelectCategory(index)}
            style={
              activeIndex == index
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }
          >
            <MaterialCommunityIcons
              name={item.iconName as any}
              size={20}
              color={activeIndex == index ? Colors.white : Colors.black}
            />
            <Text
              style={
                activeIndex == index
                  ? styles.categoryBtnTxtActive
                  : styles.categoryBtnTxt
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },
  categoryBtn: {
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  categoryBtnActive: {
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    marginLeft: 5,
    color: Colors.black,
  },
  categoryBtnTxtActive: {
    marginLeft: 5,
    color: Colors.white,
  },
});
