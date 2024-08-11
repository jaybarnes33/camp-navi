import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import RecentlyVisited from "@/components/Home/Recents";

const explore = () => {
  return (
    <SafeAreaView>
      <View className="m-4">
        <RecentlyVisited />
      </View>
    </SafeAreaView>
  );
};

export default explore;
