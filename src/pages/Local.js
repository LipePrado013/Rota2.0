import React from 'react';
import { Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function Local() {
  const navigation = useNavigation()
  const route = useRoute()

  const local = route.params.local

  console.log(local)
  const [heart, setHeart] = useState(true);
  const [foto, setFoto] = useState([]);


  return (
    <>
      <StatusBar style="dark" />
      {foto ? (null) : (
        <>
          <TouchableOpacity style={{
            position: 'absolute',
            top: 40,
            zIndex: 20,
            right: 20
          }} onPress={() => setFoto(!foto)}>
            <AntDesign name="closecircle" size={30} color="#FFF" />
          </TouchableOpacity>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            style={{
              position: 'absolute',
              zIndex: 10,
              paddingTop: 270,
              backgroundColor: '#0000009e',
              width: '100%',
              height: '100%',
            }} >

            {local.img_local1 ? (<View key={local.id_local} style={{
              margin: 10,
              borderRadius: 20,
              gap: 20,
            }} >
              <Image source={{ uri: local.img_local1 }} style={{
                width: 350,
                height: 350
              }} />

            </View>) : null}
            {local.img_local2 ? (<View style={{
              margin: 10,
              borderRadius: 20,
              gap: 20,
            }} >

              <Image source={{ uri: local.img_local2 }} style={{
                width: 350,
                height: 350
              }} />

            </View>) : null}
            {local.img_local3 ? (<View style={{
              margin: 10,
              borderRadius: 20,
              gap: 20,
            }} >

              <Image source={{ uri: local.img_local3 }} style={{
                width: 350,
                height: 350
              }} />
            </View>) : null}

            {local.img_local4 ? (<View style={{
              margin: 10,
              borderRadius: 20,
              gap: 20,
            }} >

              <Image source={{ uri: local.img_local4 }} style={{
                width: 350,
                height: 350
              }} />
            </View>) : null}

          </ScrollView>
        </>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{
        paddingTop: 12,
        // backgroundColor: '#303030',
      }}>

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 16,
          marginHorizontal: 16,
          marginVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            width: 300,
            // borderWidth: 1
          }}>
            <TouchableOpacity style={{
              padding: 5,
            }}
              onPress={() => navigation.goBack()}>
              <AntDesign name="caretleft" size={30} color="#F59230" />
            </TouchableOpacity>
            <Text style={{
              fontSize: 20,
              fontWeight: '700'
            }}>{local.nm_local}</Text>
          </View>
          <TouchableOpacity onPress={() => setHeart(!heart)}>
            {heart ? (
              < AntDesign name="hearto" size={25} color="red" />
            ) : (
              < AntDesign name="heart" size={25} color="red" />
            )}
          </TouchableOpacity>
        </View>
        <View style={{
          backgroundColor: '#fff',
          height: 250,
          borderRadius: 20,
          paddingVertical: 16,
          paddingHorizontal: 16,
          marginHorizontal: 16,
          marginBottom: 16,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 5,
          shadowRadius: 8,
          overflow: 'hidden'
        }}>
          <Image source={{ uri: local.img_local }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
        </View>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 16,
          marginHorizontal: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 5,
          shadowRadius: 8,
          gap: 10
        }}>
          <Text style={{
            fontWeight: '700',
            fontSize: 17,
            textAlign: 'justify'
          }}>{local.tx_previa} </Text>

          {local != undefined ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >

              {local.img_local1 != '' ?
                <TouchableOpacity style={{
                  margin: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                  flexDirection: 'row',
                  gap: 20,
                }}
                  onPress={() => setFoto(!foto)}>
                  <Image source={{ uri: local.img_local1 }} style={{
                    width: 100,
                    height: 100
                  }} />
                </TouchableOpacity> : null}

              {local.img_local2 != '' ?
                <TouchableOpacity style={{
                  margin: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                  flexDirection: 'row',
                  gap: 20,
                }} onPress={() => setFoto(!foto)}>
                  <Image source={{ uri: local.img_local2 }} style={{
                    width: 100,
                    height: 100
                  }} />
                </TouchableOpacity> : null}

              {local.img_local3 != '' ?
                <TouchableOpacity style={{
                  margin: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                  flexDirection: 'row',
                  gap: 20,
                }} onPress={() => setFoto(!foto)}>
                  <Image source={{ uri: local.img_local3 }} style={{
                    width: 100,
                    height: 100
                  }} />
                </TouchableOpacity>
                : null}

              {local.img_local4 != '' ?
                <TouchableOpacity style={{
                  margin: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                  flexDirection: 'row',
                  gap: 20,
                }} onPress={() => setFoto(!foto)}>
                  <Image source={{ uri: local.img_local4 }} style={{
                    width: 100,
                    height: 100
                  }} />
                </TouchableOpacity> : null}

            </ScrollView>
          ) : (null)}
          <Text style={{
            fontWeight: '700',
            fontSize: 17,
            textAlign: 'justify'
          }}>{local.tx_conteudo} </Text>
        </View>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 16,
          marginHorizontal: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 5,
          shadowRadius: 8,
          gap: 10,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity style={{
            paddingLeft: 35,
            paddingRight: 35,
            paddingBottom: 15,
            paddingTop: 15,
            borderRadius: 10,
            backgroundColor: '#F59230'
          }} onPress={() => navigation.navigate('mapaLocal', { local })}>
            <Text style={{
              color: '#fff',
              fontWeight: '600'
            }}>Abrir mapa</Text>
          </TouchableOpacity>




        </View>
      </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({});
