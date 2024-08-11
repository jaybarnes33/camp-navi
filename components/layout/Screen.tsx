import { View, Text } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Screen = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    (async () => {
      const saved = JSON.parse(
        (await AsyncStorage.getItem("profile")) as string
      );
      if (saved) {
        setProfile(saved);
      }
    })();
  });
  return (
    <LinearGradient
      // Button Linear Gradient
      className="flex-1"
      colors={["#d5f0ffaa", "#ffffff"]}
    >
      <SafeAreaView className="px-3 flex-1">
        <View className="mb-2">
          <Text>Welcome,</Text>
          {profile.name && (
            <Text className="text-base font-bold">{profile.name}</Text>
          )}
        </View>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Screen;
