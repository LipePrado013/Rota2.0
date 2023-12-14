import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import apiURL from "../config/api";

export default function Home() {
  const navigation = useNavigation()
  const route = useRoute()

  const users = route.params
  console.log(users)

  const [recomendados, setRecomendado] = useState([]);
  const [evento, setEvento] = useState([]);
  const [maisLocais, setMaisLocais] = useState([])

  function data() {
    fetch(`${apiURL}`) //mudar o ip da maquina para que a API funcione 
      .then((Response) => Response.json())
      .then(json => {
        setMaisLocais(json);
        setEvento(json.splice(7, 5)); //aq ele vai ta pegado oq ta sobrando do array, sem o 0 e 1 do array. 
        setRecomendado(json.splice(0, 2)); //aqui ele vai pegar o indece(0, 2)é quantos eu quero que ele pegue.
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    data()
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEARDER */}
        <View style={{
          paddingTop: 20,
          paddingBottom: 10,
          backgroundColor: '#000',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,

        }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#fff'
          }}> Olá, Diego Vieira</Text>
          <TouchableOpacity style={{
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
          }} onPress={() => navigation.navigate('perfil')}>
            <FontAwesome5 name="user-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* HEARDER */}

        {/* AREA DE EVENTOS */}
        <View>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 5
          }}>Eventos</Text>
          {
            recomendados.map((local) => (
              <TouchableOpacity key={local.id_local} style={{
                width: '100%',
                height: 150,
                marginTop: 10,
              }} onPress={() => navigation.navigate('local', { local })}>
                <Image style={{
                  width: '100%',
                  height: '100%'
                }} source={{ uri: local.img_local }} />
                <View style={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  height: '100%',
                  padding: 10,
                  backgroundColor: '#000000ae'
                }}>
                  <Text style={{
                    color: '#FFF',
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>{local.nm_local}</Text>
                  <Text style={{
                    color: '#FFF',
                  }}>{local.tx_previa}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
        {/* AREA DE EVENTOS */}

        {/* AREA DE DESTAQUES */}
        <View>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 5
          }}>Destaques</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {evento.map((local) => (
              <TouchableOpacity key={local.id_local} style={{
                backgroundColor: 'gray',
                margin: 10,
                width: 300,
                height: 200,
                borderRadius: 20,
                overflow: 'hidden',
              }} onPress={() => navigation.navigate('local', { local })}>
                <Image source={{ uri: local.img_local }} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
                <View style={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  height: '100%',
                  padding: 10,
                  backgroundColor: '#000000ae'
                }}>
                  <Text style={{
                    color: '#FFF',
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>{local.nm_local}</Text>
                  <Text style={{
                    color: '#FFF',
                  }}>{local.tx_previa}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View >
        {/* AREA DE DESTAQUES */}

        {/* AREA DE OUTROS */}
        <View style={{
          paddingBottom: 80
        }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 5,
          }}> Mais lugares </Text>
          <View style={{
            paddingHorizontal: 8,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
          }}>
            {maisLocais.map(local =>
              <TouchableOpacity key={local.id_local} style={{
                backgroundColor: '#FFF',
                borderRadius: 16,
                marginVertical: 5,
                alignItems: 'center',
                padding: 10,
                overflow: 'hidden',
                width: 170,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10, },
                shadowOpacity: 5,
                shadowRadius: 8,
              }} onPress={() => navigation.navigate('local', { local })}>
                <Image style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'cover',
                  borderRadius: 16,
                }} source={{ uri: local.img_local }} />
                <Text style={{
                  margin: 10,
                  fontWeight: 700,
                }}>{local.nm_local}</Text>
                <Text style={{
                  width: 150,
                  textAlign: 'center',
                }}>{local.tx_previa}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* AREA DE OUTROS */}
      </ScrollView>
    </>
  )
}