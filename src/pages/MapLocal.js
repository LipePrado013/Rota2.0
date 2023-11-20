import React from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location'
import { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps'
import { Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


export default function MapLocal() {
  const route = useRoute()
  const local = route.params.local

  const lat = parseFloat(local.lat_local)
  const lon = parseFloat(local.lon_local)

  // console.log(lat, lon)

  const [location, setLocation] = useState(null);
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }
  useEffect(() => {
    requestLocationPermissions();
  }, [])
  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      // console.log('nova localização', response)
      setLocation(response)
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="darck" />
      {location &&
        <MapView style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.055,
            longitudeDelta: 0.055,
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lon,
            }}
          >
            <Image
              source={{ uri: local.img_local }}
              style={{
                borderWidth: 2,
                borderRadius: 50,
                width: 35,
                height: 35
              }}
            />
          </Marker>


        </MapView>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
