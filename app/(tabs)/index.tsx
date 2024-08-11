import { View, Text, Image } from "react-native";
import React from "react";
import Screen from "@/components/layout/Screen";
import Avatar from "@/components/core/Avatar";
import { Feather } from "@expo/vector-icons";
import Categories from "@/components/Home/Categories";
import Recents from "@/components/Home/Recents";
import Header from "@/components/layout/Header";
import { useNavigation } from "expo-router";

const index = () => {
  const { navigate } = useNavigation();
  return (
    <Screen>
      <View className="space-y-4">
        <Header
          onSelect={(res) =>
            //@ts-ignore
            navigate("navigation", { place: res.details })
          }
          left={<Feather name="menu" size={20} />}
        />

        <View className="bg-white space-y-3 p-3 relative">
          <Text className="text-2xl font-bold">22°</Text>
          <Text className="text-gray-500 text-base">
            {new Date().toDateString()}
          </Text>
          <View className="flex-row space-x-1 items-center">
            <Feather name="map-pin" size={13} color="grey" />
            <Text className="text-gray-500 text-sm">Tarkwa, Ghana</Text>
          </View>
          <Image
            className="absolute right-3 top-0 h-14 w-14"
            source={require("@/assets/images/weather.png")}
          />
        </View>
        <Categories />
        <Recents limitted />
      </View>
    </Screen>
  );
};

export default index;
