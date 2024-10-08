import { View, ScrollView } from "react-native";
import React from "react";

import Card from "./card";

const categories = [
  {
    name: "Lecture Rooms",
    image: require("@/assets/images/lecture-room.jpg"),
  },
  {
    name: "Hostels",
    image: require("@/assets/images/hostels.jpg"),
  },
  { name: "Shopping", image: require("@/assets/images/groceries.jpg") },
  { name: "Gym", image: require("@/assets/images/gym.jpg") },
];
const Categories = () => {
  return (
    <View className="my-4 py-2 h-[28vh]">
      <ScrollView horizontal>
        {categories.map((category) => (
          <Card key={category.name} {...category} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
