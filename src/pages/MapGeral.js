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
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


export default function MapGeral() {
  const navigation = useNavigation()

  // api 
  const [locais, setLocais] = useState([]);
  // const [destaques, setDestaques] = useState([]);

  function data() {
    fetch('http://192.168.15.14:80/API-Rota/') //mudar o ip da maquina para que a API funcione 
      .then((Response) => Response.json())
      .then(json => {
        setLocais(json) //aqui ele vai pegar o indece(0, 2)é quantos eu quero que ele pegue.
      })
      .catch(err => console.error(err))
  }

  // console.log(locais)
  useEffect(() => {
    data()
  }, []);
  // api


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


  return (
    <View style={{
      flex: 1,
      marginTop: 25
    }}>
      <StatusBar style="darck" />
      {location &&
        <MapView style={{
          width: '100%',
          height: '100%',
        }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.055,
            longitudeDelta: 0.055
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {locais.map(local => <Marker key={local.id_local}
            coordinate={{
              latitude: parseFloat(local.lat_local),
              longitude: parseFloat(local.lon_local),

            }}
            onPress={() => navigation.navigate('local', { local })}
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
          )}


        </MapView>
      }

    </View>
  );
}

