import { StatusBar } from "expo-status-bar";
import { Text, ScrollView, View, TouchableOpacity, Image, FlatList } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import perfil from '../assets/img/perfil.png'
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Perfil() {

  const route = useRoute()
  const navigation = useNavigation()

  console.log(route)

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
          <Image source={perfil} style={{
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 500,
            width: 150,
            height: 150,
          }} />

          <View style={{
            gap: 5,
            alignItems: 'center',
          }}>
            <Text style={{ color: '#FFF', fontSize: 20 }}>
              Calebe Alves
            </Text>
            <Text style={{ color: '#6E6E6E' }}>
              cidade: São Paulo
            </Text>
            <Text style={{ color: '#6E6E6E' }}>
              E-mail: CalebeDacunha@gmail.com
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
          {/* <FlatList
            data={dataFav}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                backgroundColor: '#FFF',
                borderRadius: 16,
                marginVertical: 16,
                alignItems: 'center',
                padding: 10,
                overflow: 'hidden',
                width: 150,
                height: 160
              }} onPress={() => navigation.navigate('locais', { item: item })}>


                <Image style={{ width: 130, height: 100, resizeMode: 'cover', borderRadius: 16, }} source={item.image} />

                <Text style={{
                  margin: 10,
                  fontWeight: 700,
                  fontSize: 20
                }}>{item.titulo}</Text>
              </TouchableOpacity>
            )} numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }} /> */}

        </View>

      </View>

      <StatusBar style={'light'} />
    </ScrollView >
  )
} 