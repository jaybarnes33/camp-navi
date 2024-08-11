import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { useNavigation } from "expo-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const RecentlyVisited = ({ limitted }: { limitted?: boolean }) => {
  dayjs.extend(relativeTime);
  const [recents, setRecents] = useState<GooglePlaceDetail[]>();
  useEffect(() => {
    (async () => {
      const recentPlaces = await AsyncStorage.getItem("recents");
      if (recentPlaces) setRecents(JSON.parse(recentPlaces));
    })();
  }, []);

  const { navigate } = useNavigation();
  return (
    <View>
      <Text className="text-xl tracking-wider">Recently Visited</Text>
      {recents?.length ? (
        <FlatList
          className="mt-3"
          data={limitted ? recents.slice(0, 3) : recents}
          renderItem={({ item }) => (
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigate("navigation", { place: item })}
              className="flex-row items-center my-2 justify-between"
            >
              <View className="h-9 w-9 justify-center items-center bg-[#3999e826] rounded-lg">
                <FontAwesome5 name="map-marker-alt" size={20} color="#3998e8" />
              </View>
              <View className="flex-1 px-3">
                <Text className="text-lg  tracking-wider">{item.name}</Text>
                <Text className="text-gray-500 text-sm">{item.vicinity}</Text>
                {/** @ts-ignore */}
                {item.time && (
                  <View className="flex-row items-center gap-1">
                    <Feather name="clock" size={10} color={"gray"} />
                    <Text className="text-xs text-gray-500">
                      {/* @ts-ignore */}
                      {dayjs(item.time).fromNow()}
                    </Text>
                  </View>
                )}
              </View>
              <View className="h-9 w-9 justify-center items-center  rounded-lg">
                <FontAwesome5 name="directions" size={20} color="black" />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <Text className="text-red-500 text-sm">
          No recently visited locations
        </Text>
      )}
    </View>
  );
};

export default RecentlyVisited;
