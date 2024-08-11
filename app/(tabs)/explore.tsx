import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useLocation } from "@/context/Location";
import Header from "@/components/layout/Header";

import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import PlaceImage from "@/components/core/PlaceImage";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Explore = () => {
  const { location, setLocation } = useLocation();
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState<
    GooglePlaceDetail & { photos: { photo_reference: string }[] }
  >();
  const { navigate } = useNavigation();

  const [directions, setDirections] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    if (location) {
      console.log({ location });
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=800&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`
      )
        .then(async (response) => {
          const data = await response.json();

          return data;
        })
        .then((data) => setPlaces(data.results))
        .catch((e) => console.log(e));
    }
  }, [location]);

  useEffect(() => {
    if (location && place) {
      const origin = `${location.longitude},${location.latitude}`;
      const destination = `${place.geometry.location.lng},${place.geometry.location.lat}`;
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${origin};${destination}?geometries=geojson&access_token=${process.env.EXPO_PUBLIC_MAPBOX}&steps=true`
      )
        .then(async (response) => {
          const data = await response.json();
          return data;
        })
        .then((data) => {
          const route = data.routes[0].geometry.coordinates;
          setDirections(
            route.map((coord: [number, number]) => ({
              latitude: coord[1],
              longitude: coord[0],
            }))
          );
          console.log(data.routes[0].legs[0].steps);
          setInstructions(data.routes[0].legs[0].steps);
        })
        .catch((e) => console.log(e));
    }
  }, [place]);

  return (
    <View className="flex-1">
      <View className="mt-14  absolute z-50 w-full px-2">
        <Header
          onSelect={(res) =>
            setPlace(
              res.details as GooglePlaceDetail & {
                photos: { photo_reference: string }[];
              }
            )
          }
        />
      </View>
      <MapView
        style={{ flex: 1 }}
        camera={{
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          pitch: 0.3,
          heading: 0,
          altitude: 1000,
          zoom: 14,
        }}
      >
        {location && <Marker coordinate={location} />}
        {directions.length > 0 && <Polyline coordinates={directions} />}
        {place?.geometry && (
          <Marker
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
          >
            <TouchableOpacity>
              <FontAwesome name="building" size={30} />
            </TouchableOpacity>
          </Marker>
        )}
      </MapView>

      <View className="absolute bg-[#1a1a1a62]  px-4 bottom-48 w-full">
        {place?.name && (
          <TouchableOpacity
            onPress={() =>
              //@ts-ignore
              navigate("navigation", { place })
            }
            className="my-4 flex-row items-center justify-center bg-black px-5 py-2"
          >
            <Text className="text-white">Go to</Text>
            <Text className="font-bold text-white font-xl"> {place.name}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        horizontal
        className="absolute w-full bottom-20 h-[100px] px-3 "
      >
        {places.map(
          (
            place: GooglePlaceDetail & { photos: { photo_reference: string }[] }
          ) => (
            <TouchableOpacity
              onPress={() => setPlace(place)}
              className="h-full bg-white w-[250px] mr-4 rounded-lg p-4 border-gray-200 shadow border-2 flex-row space-x-2 justify-between items-center"
              key={place.place_id}
            >
              {place.photos?.length && (
                <PlaceImage reference={place.photos[0].photo_reference} />
              )}
              <View className="flex-1">
                <Text className="font-bold">{place.name}</Text>
                <Text className="capitalize text-gray-600 font-semibold">
                  {place.types[0].replaceAll("_", " ")}
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default Explore;
