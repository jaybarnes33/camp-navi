import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { useLocation } from "@/context/Location";

import MapView, { LatLng, Marker, Polyline } from "react-native-maps";

import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StreetView from "@/components/StreetView";

const Explore = () => {
  const { location, setLocation } = useLocation();

  const { back } = useRouter();
  const { place } = useRoute().params as {
    place: GooglePlaceDetail & { photos: { photo_reference: string }[] };
  };
  const { push } = useRouter();
  const [directions, setDirections] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [view, setView] = useState<"map" | "street">("map");

  const handleClick = () => {
    console.log("clicked");
  };

  const handleToggleView = () => {
    setView(prevView => (prevView === "map" ? "street" : "map"));
  };

  const endNavigation = async () => {
    try {
      const recents = Array.from(
        JSON.parse((await AsyncStorage.getItem("recents")) as string) || []
      );
      await AsyncStorage.setItem(
        "recents",
        JSON.stringify([
          { ...place, time: new Date().toISOString() },
          ...recents
        ])
      );
      //@ts-ignore
      push("(tabs)");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location && place) {
      const origin = `${location.longitude},${location.latitude}`;
      const destination = `${place.geometry.location.lng},${place.geometry.location.lat}`;
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${origin};${destination}?geometries=geojson&access_token=${process.env.EXPO_PUBLIC_MAPBOX}&steps=true`
      )
        .then(async response => {
          const data = await response.json();
          return data;
        })
        .then(data => {
          const route = data.routes[0].geometry.coordinates;
          setDirections(
            route.map((coord: [number, number]) => ({
              latitude: coord[1],
              longitude: coord[0]
            }))
          );
          setInstructions(data.routes[0].legs[0].steps);
        })
        .catch(e => console.log(e));
    }
  }, [place]);

  return (
    <View className="flex-1">
      <View className="absolute top-10 z-50 mx-5 flex space-y-4">
        <TouchableOpacity className="" onPress={back}>
          <FontAwesome name="arrow-left" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          className={[
            view === "map" ? "bg-white" : "bg-cyan-400",
            "p-2 rounded-md grid place-items-center"
          ].join(" ")}
          onPress={handleToggleView}
        >
          <FontAwesome name="street-view" size={30} />
        </TouchableOpacity>
      </View>
      {view === "map" ? (
        <MapView
          style={{ flex: 1 }}
          camera={{
            center: {
              latitude: location.latitude,
              longitude: location.longitude
            },
            pitch: 20,
            heading: 1,
            altitude: 1000,
            zoom: 20
          }}
        >
          {location && <Marker coordinate={location} />}
          {directions.length > 0 && (
            <Polyline coordinates={directions} strokeWidth={10} />
          )}
          {place && (
            <Marker
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng
              }}
            >
              <TouchableOpacity className="items-center">
                <FontAwesome name="building" size={30} />
                <Text>{place.name}</Text>
              </TouchableOpacity>
            </Marker>
          )}
        </MapView>
      ) : (
        <StreetView />
      )}
      {instructions.length > 0 && (
        <View className="absolute bg-[#f4f4f443] bottom-20  w-full">
          <Text className="mx-4 my-3 text-xl">Directions to {place.name}</Text>
          <FlatList
            data={instructions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Text className="mx-4 my-1">
                {
                  //@ts-ignore
                  item.maneuver.instruction
                }
              </Text>
            )}
          />
          <TouchableOpacity
            onPress={endNavigation}
            className="my-4 flex-row items-center mx-4 justify-center bg-black px-5 py-3"
          >
            <Text className="text-white">End Navigation</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Explore;
