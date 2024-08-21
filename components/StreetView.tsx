import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { ExpoWebGLRenderingContext, GLView, GLViewProps } from "expo-gl";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { runOnUI } from "react-native-reanimated";

export default function StreetView() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === "back" ? "front" : "back"));
  }

  const render = (gl: ExpoWebGLRenderingContext | undefined) => {
    "worklet";
    // add your WebGL code here
  };

  const onContextCreate: GLViewProps["onContextCreate"] = gl => {
    runOnUI((contextId: number) => {
      "worklet";
      const gl = GLView.getWorkletContext(contextId);
      render(gl);
    })(gl.contextId);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <GLView
            style={{ width: 300, height: 300 }}
            enableExperimentalWorkletSupport
            onContextCreate={onContextCreate}
          />
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  message: {
    textAlign: "center",
    paddingBottom: 10
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  }
});
