import { View, Text, TouchableOpacity } from "react-native";
import React, { ComponentType, ReactNode } from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import GooglePlacesInput from "../core/PlacesInput";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import Avatar from "../core/Avatar";

import { useRouter } from "expo-router";

const Header = ({ left }: { left?: ReactNode }) => {
  const router = useRouter();
  return (
    <View className="flex-row justify-between items-center">
      {left ? (
        left
      ) : (
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="keyboard-backspace" size={20} />
        </TouchableOpacity>
      )}
      <View className="flex-1 mx-2 h-20">
        <GooglePlacesInput
          onSelect={(
            data: GooglePlaceData,
            details: GooglePlaceDetail | null
          ) => details && console.log(details)}
          left={
            (
              <View className="h-10 w-10 items-center justify-center ">
                <Feather name="search" color="blue" />
              </View>
            ) as unknown as ComponentType<{}>
          }
        />
      </View>
      {/* <Avatar /> */}
    </View>
  );
};

export default Header;
