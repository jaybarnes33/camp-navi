import React, { useState, useEffect, ComponentType } from "react";
import MapView, { Circle, LatLng, Marker, Polyline } from "react-native-maps";

import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { useLocation } from "@/context/Location";

import Header from "@/components/layout/Header";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import PlaceImage from "@/components/core/PlaceImage";
import { getPath } from "@/utils";

const Map = () => {
  const [places, setPlaces] = useState([]);

  const { location } = useLocation();
  const [place, setPlace] = useState<LatLng>();
  const [polyline, setPolyline] = useState<LatLng[]>([]);

  useEffect(() => {
    if (location) {
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

  const selectPlace = async (place: GooglePlaceDetail) => {
    setPlace({
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    });

    const path = await getPath(
      `${location.latitude},${location.longitude}`,
      `place_id:${place.place_id}`
    );
    console.log(path);
    path?.coordinates && setPolyline(path.coordinates);
  };

  return (
    <View className="flex-1">
      <View className="mt-14 px-4 absolute z-50 w-full">
        <Header />
      </View>
      <MapView
        className="flex-1 h-screen "
        zoomControlEnabled={true}
        showsCompass
        showsMyLocationButton
        showsIndoors
        showsTraffic
        showsScale
        region={{ ...location, latitudeDelta: 0.0122, longitudeDelta: 0.0121 }}
      >
        <Circle
          center={location}
          radius={500}
          shouldRasterizeIOS
          fillColor="#4eacfe17"
          strokeWidth={1}
          strokeColor="#4eacfe2c"
          lineDashPattern={[5]}
        />
        {place?.latitude && <Marker coordinate={place} pinColor="blue" />}
        <Marker coordinate={location} />
        <Polyline coordinates={polyline} />
      </MapView>

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
              onPress={() => selectPlace(place)}
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

export default Map;
