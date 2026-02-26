import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, MarkerAnimated } from "react-native-maps";
import { useLocation, getBeavBusVehiclePositions} from "@/src/hooks";
import AlertsButton from "../components/AlertsButton";

export default function HomeScreen() {
  const { location, loading, error } = useLocation();
  const { vehicles, refresh } = getBeavBusVehiclePositions();
  const [buses, setBuses] = useState<any[]>([]);
  const busCoordsRef = useRef<Record<string, any>>({});
  const markerImg = require('../assets/images/bus.png');
  // Initialize bus positions when location is available

  useEffect(() => {
    if (!vehicles) return;

    const updatedBuses = vehicles.map(vehicle => {
      const id = `bus${vehicle.VehicleID}`;
      
      if (!busCoordsRef.current[id]) {
        busCoordsRef.current[id] = new AnimatedRegion({
          latitude: vehicle.Latitude,
          longitude: vehicle.Longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        });
      } else {
        busCoordsRef.current[id].timing({
          latitude: vehicle.Latitude,
          longitude: vehicle.Longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }

      return {
        id,
        coordinate: {
          latitude: vehicle.Latitude,
          longitude: vehicle.Longitude,
        },
      };
    });

    setBuses(updatedBuses);

  }, [vehicles]);


  // Simulate bus movement every second (for test purposes)

  useEffect(() => {
    const interval = setInterval(() => {
      refresh(); // fetch new vehicle data
    }, 1000);

    return () => clearInterval(interval);
  }, [refresh]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Getting your location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Unable to get location</Text>
      </View>
    );
  }

  return (
    <>  
      <AlertsButton />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsTraffic={true}
        >
          {buses.map((bus) => (
            <MarkerAnimated
              key={bus.id}
              coordinate={busCoordsRef.current[bus.id] || bus.coordinate}
              rotation={bus.heading}
              image={markerImg}
            />
          ))}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
});
