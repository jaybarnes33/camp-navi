import useGooglePlaces from "@/hooks/googlePlaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import clsx from "clsx";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
const GooglePlacesInput = ({
  label,
  onSelect,
  left,
}: {
  label?: string;
  onSelect: (data: {
    data: GooglePlaceData;
    details: GooglePlaceDetail;
  }) => void;
  left: ReactNode;
}) => {
  const { places, loading, searchQuery, setSearchQuery } = useGooglePlaces();

  return (
    <>
      <View className="flex-row ml-8 bg-white py-3 p-3 h-12 items-center mb-2">
        {left}
        <View className="flex-1 pl-2">
          <TextInput
            placeholder="Where do you want to go to?"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
          />
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            className={clsx([
              !searchQuery.length && !places.length && "hidden",
            ])}
            onPress={() => {
              setSearchQuery("");
            }}
          >
            <MaterialCommunityIcons name="close" size={20} />
          </TouchableOpacity>
        )}
      </View>
      <View className="bg-white px-2 ">
        {places && places?.length ? (
          places.map((place) => (
            <TouchableOpacity
              key={place.data.place_id}
              className="flex-row gap-3 items-center py-3 border-gray-200 border-b "
              onPress={() => {
                onSelect(place);
                setSearchQuery("");
              }}
            >
              <MaterialCommunityIcons name="clock" size={20} />
              <View className="flex-1 space-y-1">
                <Text className="font-bold ">
                  {place.data.structured_formatting.main_text}
                </Text>
                <Text className="text-neutral-500">
                  {place.data.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            className={clsx([(!searchQuery.length || loading) && "hidden"])}
          >
            Place not found
          </Text>
        )}
      </View>
    </>
  );
};

export default GooglePlacesInput;
