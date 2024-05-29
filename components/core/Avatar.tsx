import { View, Text, Image } from "react-native";
import React from "react";

const Avatar = () => {
  return (
    <View className="border-4 border-white rounded-lg">
      <Image
        className="h-7 w-7 rounded-lg"
        source={require("../../assets/images/avatar.avif")}
      />
    </View>
  );
};

export default Avatar;
