import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Card = ({
  name,
  image,
}: {
  name: string;
  image: ImageSourcePropType;
}) => {
  return (
    <View
      className=" 
   w-48 h-full mr-3 relative"
    >
      <LinearGradient
        className="absolute bottom-0 w-full h-2/3  z-10 rounded-b-2xl"
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
      />
      <Image source={image} className="h-full w-full rounded-2xl" />
      <View className="absolute bottom-3 left-3 py-2  z-20">
        <Text className="text-white  text-xl">{name}</Text>
        <Text className="text-white text-sm">
          {Math.floor(Math.random() * 70 + 1)} Locations
        </Text>
      </View>
    </View>
  );
};

export default Card;
