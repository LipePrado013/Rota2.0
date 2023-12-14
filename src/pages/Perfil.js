import { StatusBar } from "expo-status-bar";
import { Text, ScrollView, View, TouchableOpacity, Image, FlatList } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import perfil from '../assets/img/perfil.png'
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import apiURL from "../config/api";

export default function Perfil() {

  // const route = useRoute()
  const navigation = useNavigation()

  // const user = route.params
  // console.log(user.nm_user)

  const [recomendados, setRecomendado] = useState([]);


  function data(){
    fetch(`${apiURL}`)
      .then((response) => response.json())
      .then((json) => {
        setRecomendado(json.splice(0, 3));
      })
      .catch((err) => console.error(err));
  }
  
  useEffect(() => {
    data()
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{

    }}>
      {/* header */}
      <View style={{
        paddingTop: 30,
        backgroundColor: '#121212',
        padding: 10,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
      }}>
        <View style={{

          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={{
            padding: 5,
            width: 40,
          }} onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircle" size={30} color="#F59230" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Ionicons name="exit-outline" size={30} color="#F59230" />
          </TouchableOpacity>

        </View>
        <View
          style={{
            alignItems: 'center',
            gap: 5
          }}>
          <TouchableOpacity>
            <Image source={perfil} style={{
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 500,
              width: 150,
              height: 150,
            }} />
          </TouchableOpacity>

          <View style={{
            gap: 5,
            alignItems: 'center',
          }}>
            <Text style={{ color: '#FFF', fontSize: 20 }}>
              Nome: Diego Vieira{/*  {user.nome} {user.sobrenome} */}
            </Text>
            <Text style={{ color: '#6E6E6E' }}>
              cidade: São Vicente{/*  {user.cidade} */}
            </Text>
            <Text style={{ color: '#6E6E6E' }}>
              E-mail: diego@gmail.com{/*  {user.email} */}
            </Text>
          </View>
        </View>

      </View>
      {/* header fim */}
      <View style={{
        paddingStart: 14,
        paddingEnd: 14
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          borderBottomWidth: 3
        }}>
          Favoritos
        </Text>

        <View style={{
          padding: 10
        }}>
         <View>
         
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
            
              
            

        </View>

      </View>

      <StatusBar style={'light'} />
    </ScrollView >
  )
} 