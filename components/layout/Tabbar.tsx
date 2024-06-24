import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { ReactNode } from "react";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { Profile, TicketDiscount } from "iconsax-react-native";
import { router } from "expo-router";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const icons: Record<string, [ReactNode, ReactNode]> = {
    index: [
      <Feather name="home" size={20} color="gray" />,
      <Feather name="home" size={20} color="black" />,
    ],
    explore: [
      <Feather name="map" size={20} color="gray" />,
      <Feather name="map" size={20} color="black" />,
    ],
    profile: [
      <FontAwesome5 size={20} name="user" color="gray" />,
      <FontAwesome5 size={20} name="user" variant="Bold" color="black" />,
    ],
    activity: [
      <Feather size={20} name="activity" color="gray" />,
      <Feather size={20} name="activity" color="black" />,
    ],
  };

  return (
    <View className="bg-white  rounded-t-3xl shadow py-2 px-4 fixed">
      <View className="flex-row h-16 items-center">
        {state.routes.slice(0, 2).map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center" }}
            >
              {!isFocused ? (
                icons[route.name]?.at(0)
              ) : (
                <View className="relative -top-2 scale-105">
                  {icons[route.name]?.at(1)}
                  {isFocused && (
                    <View className="h-1 w-1 mx-auto rounded-full -bottom-2 bg-black " />
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={() => router.push("navigation")}
          className=" -mt-4 items-center justify-center rounded-full"
        >
          <Image
            source={require("@/assets/images/Search.png")}
            className="h-20 w-20"
          />
        </TouchableOpacity>
        {state.routes.slice(2, 4).map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index + 2;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center" }}
            >
              {!isFocused ? (
                icons[route.name]?.at(0)
              ) : (
                <View className="relative -top-2 scale-105">
                  {icons[route.name]?.at(1)}
                  {isFocused && (
                    <View className="h-1 w-1 mx-auto rounded-full -bottom-2 bg-black " />
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
