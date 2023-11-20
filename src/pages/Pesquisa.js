import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
import { Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { validate } from 'react-native-web/dist/cjs/exports/StyleSheet/validate';

// {/* pre definido apenas para a apresentação excluir dpois */}
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// {/* pre definido apenas para a apresentação excluir dpois */}

export default function Pesquisa() {
  const navigation = useNavigation()
  const [pesquisa, setPesquisa] = useState('')
  const [locais, setLocais] = useState([]);

  function data() {
    fetch('http://192.168.15.13:80/API-Rota/') //mudar o ip da maquina para que a API funcione 
      .then((Response) => Response.json())
      .then(json => setLocais(json))
      .catch(err => console.error(err))
  }
  // console.log(locais)

  useEffect(() => {
    data()
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{
        marginTop: 30,
      }}>

        <View style={{
          marginHorizontal: 30,
          paddingTop: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <TextInput placeholder='Pesquisar' style={{
            borderWidth: 1,
            padding: 9,
            fontSize: 17,
            flex: 1,
            borderRadius: 20
          }}
            onChangeText={setPesquisa} />
        </View>

        {/* resultado da pesquisa  */}
        <View style={{
          marginStart: 14,
          marginTop: 20,
          paddingBottom: 100,
          gap: 10
        }}>
          {locais.filter((peq) => {
            if (pesquisa === '') {
              return peq
            }
            else if (peq.nm_local.includes(pesquisa)) {
              return peq
            }
          }).map(local => (
            <TouchableOpacity key={local.id_local} style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              padding: 5,
              backgroundColor: '#000',
              borderTopLeftRadius: 100,
              borderBottomLeftRadius: 100,
              justifyContent: 'space-between',

            }} onPress={() => navigation.navigate('local', { local })}>
              <Image source={{ uri: local.img_local }} style={{
                width: 100,
                height: 100,
                borderRadius: 50,

              }} />
              <View style={{
                justifyContent: 'space-around',
                flexDirection: 'column',
                // borderWidth: 1,
                // borderColor: '#fff',
                height: 100,
              }}>
                <Text style={{
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: 20,
                  width: 250
                }}>{local.nm_local}</Text>
                <Text style={{
                  width: 230,
                  textAlign: 'justify',
                  color: '#fff'
                }}>{local.tx_previa}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* resultado da pesquisa fim */}
      </ScrollView >
    </>
  );
}

