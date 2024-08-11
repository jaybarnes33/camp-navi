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

const Header = ({
  left,
  onSelect,
}: {
  left?: ReactNode;
  onSelect: (data: {
    data: GooglePlaceData;
    details: GooglePlaceDetail;
  }) => void;
}) => {
  const router = useRouter();
  return (
    <View className="flex-row justify-between items-start">
      <View className="absolute z-40 h-12 justify-center">
        {left ? (
          left
        ) : (
          <TouchableOpacity
            onPress={() => router.back()}
            className=" h-10 w-7  justify-center items-center
       bg-black"
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              color="white"
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-1">
        <GooglePlacesInput
          label="Where to?"
          onSelect={(data) => onSelect(data)}
          left={<Feather name="search" />}
        />
      </View>
      {/* <Avatar /> */}
    </View>
  );
};

export default Header;
