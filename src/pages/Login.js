import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native"
import img from '../assets/img/logo.png'
import { cloneElement, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import apiURL from "../config/api";
// import { LinearGradient } from "expo-linear-gradient";


export default function Login() {
  // const route = useRoute();
  const navigation = useNavigation()
  const [naoValido, setNaoValid] = useState(false)
  // const [campos, setCampos] = useState(false)

  // api 
  const [users, setUsers] = useState([]);

  function data() {
    fetch(`${apiURL}/users`) //mudar o ip da maquina para que a API funcione 
      .then((Response) => Response.json())
      .then(json => {
        setUsers(json) //aqui ele vai pegar o indece(0, 2)é quantos eu quero que ele pegue.
      })
      .catch(err => console.error(err))
  }
  // api
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // console.log(email)


  useEffect(() => {
    data()
  });
  function login() {

    // Verifique se o email fornecido está na lista de usuários
    const user = users.find(userData => userData.email === email && userData.senha === senha);
    // console.log(users)

    if (user) {
      // Se login bem sucedido, direciona para a página "Home"
      navigation.navigate('main', { screen: 'home', user });

      // navigation.navigate('perfil', user);//tem que arrumar aq 


      setEmail('')
      setSenha('')
    } else {
      //Se login estiver errado dará erro
      // console.log('Email ou senha inválidos');
      // alert('Email ou senha inválidos')
      setNaoValid(true);
      setTimeout(() => setNaoValid(false), 2000);

      setEmail('')
      setSenha('')
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        padding: 16,
      }}>
        <Image style={{
          width: 120,
          height: 200
        }} source={img} />
        <TextInput style={styles.input}
          onChangeText={value => setEmail(value)}
          placeholder="E-mail"
          value={email} // Adicione este valor 
        />
        <TextInput style={styles.input}
          onChangeText={value => setSenha(value)}
          secureTextEntry={true} placeholder="Senha"
          value={senha} // Adicione este valor 
        />
        <TouchableOpacity style={{
          padding: 10,
          width: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F59230',
          borderRadius: 10,
          marginBottom: 15,
          margin: 10,
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

        {naoValido && (
          <View style={{
            zIndex: 200,
            // borderWidth: 1,
            width: 180,
            alignItems: 'center',
            padding: 3,
            backgroundColor: '#F0482B',
            position: 'absolute',
            top: 200,
            borderRadius: 20

          }}>
            <Text style={{
              color: '#fff',
              fontSize: 20,
            }}>E-mail ou senha Invalido</Text>
          </View>
        )}


      </View>
    </>
  )
}

const styles = StyleSheet.create({

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
    height: 50,
    fontSize: 17,
    marginVertical: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#F59230',
    padding: 10,
    borderRadius: 4,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


