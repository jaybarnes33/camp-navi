import React, { ComponentType } from "react";
import { Text, TextInput, View } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
const GooglePlacesInput = ({
  label,
  onSelect,
  left,
}: {
  label?: string;
  onSelect: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;
  left: ComponentType<{}>;
}) => {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        fetchDetails
        placeholder="Search"
        listViewDisplayed={false}
        onPress={onSelect}
        enablePoweredByContainer={false}
        listEmptyComponent={
          <View>
            <Text>No results found</Text>
          </View>
        }
        styles={{
          container: {
            height: "30%",
          },

          textInputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
          },
        }}
        renderLeftButton={() => left}
        numberOfLines={4}
        onTimeout={() => console.log("Timed out")}
        onFail={(e) => console.log(e)}
        query={{
          key: process.env.EXPO_PUBLIC_MAPS_KEY,
        }}
      />
    </>
  );
};

export default GooglePlacesInput;
