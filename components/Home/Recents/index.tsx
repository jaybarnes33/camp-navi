import { View, Text, FlatList } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const recentItems = [
  {
    name: "CB 1",
    address: "Computer Science Block",
    distance: "0.5 km",
  },
  {
    name: "Library",
    address: "Main Library",
    distance: "1.2 km",
  },
  {
    name: "Gym",
    address: "Campus Gym",
    distance: "0.8 km",
  },
  {
    name: "Cafeteria",
    address: "Student Cafeteria",
    distance: "0.3 km",
  },
  {
    name: "Parking Lot",
    address: "Campus Parking Lot",
    distance: "0.7 km",
  },
];

const RecentlyVisited = () => {
  return (
    <View>
      <Text className="text-xl tracking-wider">Recently Visited</Text>
      <FlatList
        className="mt-3"
        data={recentItems.slice(0, 3)}
        renderItem={({ item }) => (
          <View className="flex-row items-center my-2 justify-between">
            <View className="h-9 w-9 justify-center items-center bg-[#3999e826] rounded-lg">
              <FontAwesome5 name="map-marker-alt" size={20} color="#3998e8" />
            </View>
            <View className="flex-1 px-3">
              <Text className="text-lg  tracking-wider">{item.name}</Text>
              <Text className="text-gray-500 text-sm">{item.address}</Text>
            </View>
            <Text className="text-gray-400 text-sm">{item.distance}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default RecentlyVisited;
