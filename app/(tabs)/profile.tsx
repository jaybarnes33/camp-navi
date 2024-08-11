import AsyncStorage from "@react-native-async-storage/async-storage";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Toast from "react-native-root-toast";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [defaultProfile, setDefaultProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };
  const handleSave = async () => {
    // Handle save logic here
    await AsyncStorage.setItem(
      "profile",
      JSON.stringify({
        name: profile.name ?? defaultProfile.name,
        email: profile.email ?? defaultProfile.email,
        phone: profile.phone ?? defaultProfile.phone,
      })
    );
    Toast.show("Profile saved", {
      position: Toast.positions.TOP,
    });
  };

  useEffect(() => {
    (async () => {
      const saved = JSON.parse(
        (await AsyncStorage.getItem("profile")) as string
      );
      if (saved) {
        setDefaultProfile(saved);
      }
    })();
  });

  const disabled = defaultProfile.name.length
    ? !defaultProfile.name
    : !profile.name;
  return (
    <SafeAreaView>
      <KeyboardAvoidingView className="px-4 bg-white py-4">
        <Text className="text-xl my-2 font-bold">Set up your profile</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          defaultValue={defaultProfile.name}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          defaultValue={defaultProfile.email}
          onChangeText={(value) => handleChange("email", value)}
          editable
          textContentType="emailAddress"
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          defaultValue={defaultProfile.phone}
          onChangeText={(value) => handleChange("phone", value)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          className={clsx([
            "bg-blue-500 py-3 items-center",
            disabled && "opacity-50",
          ])}
          onPress={handleSave}
          disabled={disabled}
        >
          <Text className="text-white">Save Details</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Profile;
