import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
const Screen = ({ children }: { children: ReactNode }) => {
  return (
    <LinearGradient
      // Button Linear Gradient
      className="flex-1"
      colors={["#d5f0ffaa", "#ffffff"]}
    >
      <SafeAreaView className="px-3 flex-1">{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default Screen;
