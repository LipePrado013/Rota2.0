import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native"
import img from '../assets/img/logo.png'
import { cloneElement, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
// import { LinearGradient } from "expo-linear-gradient";


export default function Login() {
  // const route = useRoute();
  const navigation = useNavigation()


  // api 
  const [users, setUsers] = useState([]);
  // const [destaques, setDestaques] = useState([]);

  function data() {
    fetch('http://192.168.15.13:80/API-Rota/users') //mudar o ip da maquina para que a API funcione 
      .then((Response) => Response.json())
      .then(json => {
        setUsers(json) //aqui ele vai pegar o indece(0, 2)é quantos eu quero que ele pegue.
      })
      .catch(err => console.error(err))
  }

  // console.log(users)

  useEffect(() => {
    data()
  }, []);
  // api

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  // console.log(email)

  function login() {
    // Verifique se o email fornecido está na lista de usuários
    const user = users.find(userData => userData.cd_email === email && userData.cd_senha === senha);

    if (user) {
      // Se login bem sucedido, direciona para a página "Home"
      navigation.navigate('main', { screen: 'home', user });
    } else {
      //Se login estiver errado dará erro
      console.log('Email ou senha inválidos');
      alert('Email ou senha inválidos')
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        gap: 20,
      }}>
        <Image style={{
          width: 120,
          height: 200
        }} source={img} />
        <TextInput style={{
          borderWidth: 1,
          backgroundColor: "#fff",
          padding: 2,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: 300,
          height: 50,
          borderWidth: 0,
          fontSize: 22,
        }}
          onChangeText={value => setEmail(value)}
          placeholder="E-mail" />
        <TextInput style={{
          borderWidth: 1,
          backgroundColor: "#fff",
          padding: 2,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: 300,
          height: 50,
          borderWidth: 0,
          fontSize: 22,
        }}
          onChangeText={value => setSenha(value)}
          secureTextEntry={true} placeholder="Senha" />
        <TouchableOpacity style={{
          padding: 10,
          width: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F59230',
          borderRadius: 10,
          borderWidth: 0,
          color: '#fff'
        }}
          onPress={login}>
          <Text style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: "#fff"
          }}>
            Logar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          padding: 10,
          width: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          borderWidth: 0,
        }} onPress={() => navigation.navigate('cadastrar')}>

          <Text style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: "#fff"
          }}>
            Cadastar-se
          </Text>

        </TouchableOpacity>



      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  img: {

  },
  imgLogo: {

  },
  input: {

  },
  btnLogar: {

  },
  btncadastar: {


  },
  textBTN: {

  },
});
