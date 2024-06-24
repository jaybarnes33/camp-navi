import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";

const PlaceImage = ({ reference }: { reference: string }) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${reference}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`
    )
      .then(async (response) => {
        return response.url;
      })
      .then((data) => setImage(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Image
      className="w-2/5 h-full rounded-sm"
      source={{ uri: image }}
      contentFit="cover"
    />
  );
};

export default PlaceImage;
