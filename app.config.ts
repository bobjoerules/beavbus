import "dotenv/config";

export default {
  expo: {
    name: "BeavBus",
    owner: "bobjoerules",
    slug: "beavbus",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "beavbus",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: "./src/assets/images/logo.png",
    extra: {
      "eas": {
        "projectId": "435cb36c-2a12-4e0d-a37b-5a51dd5f55cb"
      },
      maptilerApiKey: process.env.MAPTILER_API_KEY,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.beavbus.application",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        maptilerApiKey: process.env.MAPTILER_API_KEY,
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "BeavBus uses your location to show nearby places.",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "BeavBus uses your location to support tracking while traveling.",
        NSLocationAlwaysUsageDescription:
          "BeavBus needs background location access to function correctly.",
        UIBackgroundModes: ["location"],
        ITSAppUsesNonExemptEncryption : false
      },
    },
    android: {
      package: "com.beavbus.application",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      config: {
        googleMapsApiKey: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
        maptilerApiKey: {
          apiKey: process.env.MAPTILER_API_KEY,
        },
      },
    },
    plugins: [
      "expo-router",
      "expo-splash-screen",
      "expo-status-bar",
      "expo-notifications",
      [
        "react-native-maps",
        {
          iosGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow BeavBus to use your location.",
        },
      ],
      [
        "expo-web-browser"
      ],
    ],
    experiments: {
      reactCompiler: false,
    },
  },
};
