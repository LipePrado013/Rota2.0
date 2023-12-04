// import React from 'react';
// import {
//   requestForegroundPermissionsAsync,
//   getCurrentPositionAsync,
//   LocationObject,
//   watchPositionAsync,
//   LocationAccuracy
// } from 'expo-location'
// import { useEffect, useState, useRef } from 'react';
// import MapView, { Marker } from 'react-native-maps'
// import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';


// export default function MapGeral() {
//   const navigation = useNavigation()

//   // api 
//   const [locais, setLocais] = useState([]);
//   // const [destaques, setDestaques] = useState([]);

//   function data() {
//     fetch('http://192.168.15.14:80/API-Rota/') //mudar o ip da maquina para que a API funcione 
//       .then((Response) => Response.json())
//       .then(json => {
//         setLocais(json) //aqui ele vai pegar o indece(0, 2)é quantos eu quero que ele pegue.
//       })
//       .catch(err => console.error(err))
//   }

//   // console.log(locais)
//   useEffect(() => {
//     data()
//   }, []);
//   // api


//   const [location, setLocation] = useState(null);
//   async function requestLocationPermissions() {
//     const { granted } = await requestForegroundPermissionsAsync();
//     if (granted) {
//       const currentPosition = await getCurrentPositionAsync();
//       setLocation(currentPosition);
//     }
//   }
//   useEffect(() => {
//     requestLocationPermissions();
//   }, [])


//   return (
//     <View style={{
//       flex: 1,
//       marginTop: 25
//     }}>
//       <View style={{
//         borderWidth: 1,
//         position: 'absolute',
//         zIndex: 100,
//         bottom: 80,
//         left: 50,
//         flexDirection: 'row',
//         gap: 10,

//       }}>

//         <TouchableOpacity style={{
//           borderWidth: 1,
//           paddingLeft: 15,
//           paddingRight: 15,
//           justifyContent: 'center'
//         }}>
//           <Text>2kg</Text>
//         </TouchableOpacity>


//         <TouchableOpacity style={{
//           borderWidth: 1,
//           paddingLeft: 15,
//           paddingRight: 15,
//           justifyContent: 'center'
//         }}>
//           <Text>5kg</Text>
//         </TouchableOpacity>
//       </View>
//       <StatusBar style="darck" />
//       {location &&
//         <MapView style={{
//           width: '100%',
//           height: '100%',
//         }}
//           region={{
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0,
//             longitudeDelta: 0.05
//           }}
//           showsUserLocation={true}
//           loadingEnabled={true}
//         >
//           {locais.map(local => <Marker key={local.id_local}
//             coordinate={{
//               latitude: parseFloat(local.lat_local),
//               longitude: parseFloat(local.lon_local),

//             }}
//             onPress={() => navigation.navigate('local', { local })}
//           >
//             <Image
//               source={{ uri: local.img_local }}
//               style={{
//                 borderRadius: 50,
//                 width: 35,
//                 height: 35
//               }}

//             />
//           </Marker>
//           )}


//         </MapView>
//       }

//     </View>
//   );
// }

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

export default function MapGeral() {
  const navigation = useNavigation();

  const [locais, setLocais] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    fetch('http://192.168.15.14:80/API-Rota/')
      .then((response) => response.json())
      .then((json) => {
        setLocais(json);
      })
      .catch((err) => console.error(err));
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
          bottom: 80,
          left: '33%',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingLeft: 15,
            paddingRight: 15,
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 20

          }}
          onPress={() => ZoomMapa(0.02)} // Adjust the delta as needed
        >
          <Text>2km</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingLeft: 15,
            paddingRight: 15,
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 20

          }}
          onPress={() => ZoomMapa(0.05)} // Adjust the delta as needed
        >
          <Text>5km</Text>
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
