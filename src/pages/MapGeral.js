

import React, { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import apiURL from '../config/api';

export default function MapGeral() {
  const navigation = useNavigation();

  const [locais, setLocais] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [trocaKM2, setTrocaKM2] = useState(true);
  const [trocaKM5, setTrocaKM5] = useState(false);

  function data(){
    fetch(`${apiURL}`)
    .then((response) => response.json())
    .then((json) => {
      setLocais(json);
    })
    .catch((err) => console.error(err));
  }
  useEffect(() => {
   data()
  }, []);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setMapRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  const ZoomMapa = (delta) => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 100,
          bottom: 100,
          left: '33%',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <TouchableOpacity 
         style={{
            borderWidth: 1,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'center',
            backgroundColor: '#121212',
            padding: 10,
            borderRadius: 20,

          }}
          onPress={() => (ZoomMapa(0.02), (setTrocaKM2(!trocaKM2)), (setTrocaKM5(!trocaKM5)) )} // Adjust the delta as needed
        >
          { trocaKM2 ? 
            (<Text
          style={{
            color: "#fff",
          }}
          >2km</Text>
          ) : 
          (<Text
          style={{
            color: "#F59230",
            fontWeight: "bold",
          }}
          >2km</Text>)}
        </TouchableOpacity>

        <TouchableOpacity 
         style={{
            borderWidth: 1,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'center',
            backgroundColor: '#121212',
            padding: 10,
            borderRadius: 20,

          }}
          onPress={() => (ZoomMapa(0.05), (setTrocaKM5(!trocaKM5)), (setTrocaKM2(!trocaKM2)))} // Adjust the delta as needed
        >
          { trocaKM5 ? 
            (<Text
          style={{
            color: "#fff",
            
          }}
          >5km</Text>
          ) : 
          (<Text
          style={{
            color: "#F59230",
            fontWeight: "bold",
          }}
          >5km</Text>)}
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
      {location && (
        <MapView
          style={{ width: '100%', height: '100%' }}
          region={mapRegion}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {locais.map((local) => (
            <Marker
              key={local.id_local}
              coordinate={{
                latitude: parseFloat(local.lat_local),
                longitude: parseFloat(local.lon_local),
              }}
              onPress={() => navigation.navigate('local', { local })}
            >
              <Image
                source={{ uri: local.img_local }}
                style={{
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                }}
              />
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}