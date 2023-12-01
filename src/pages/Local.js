import React from 'react';
import { Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ImagemModal from '../components/ImagemModal';

export default function Local() {
  const navigation = useNavigation()
  const route = useRoute()

  const local = route.params.local

  console.log(local)


  const [heart, setHeart] = useState(true);
  const [foto, setFoto] = useState([]);

  // // modal
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState('');

  const abrirModal = (imagem) => {
    setImagemSelecionada(imagem);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setImagemSelecionada('');
    setModalAberto(false);
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} style={{
        paddingTop: 12,
      }}>
        {modalAberto && (
          <ImagemModal imagem={imagemSelecionada} fecharModal={fecharModal} />
        )}
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
                  onPress={() => abrirModal(local.img_local1)}
                >
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
                }} onPress={() => abrirModal(local.img_local2)}
                >
                  <Image source={{ uri: local.img_local2 }}
                    style={{
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
                }} onPress={() => abrirModal(local.img_local3)}>
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
                }} onPress={() => abrirModal(local.img_local4)}>
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
