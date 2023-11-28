import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native"
import img from '../assets/img/logo.png'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro() {
  const navigation = useNavigation()


  const [nome, setNome] = useState('')
  const [sobreNome, setSobreNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')

  // const [formis, setFormis] = useState({
  //   nome: '',
  //   sobreNome: '',
  //   cidade: '',
  //   email: '',
  //   senha: '',
  //   ConfirmaSenha: ''
  // })


  function data() {
    fetch('http://192.168.15.13:80/API-Rota/cadUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        sobreNome: sobreNome,
        cidade: cidade,
        email: email,
        senha: senha,
        confirmaSenha: confirmaSenha,
      })
    }).then(res => res.json()).then(console.log(
      nome,
      sobreNome,
      cidade,
      email,
      senha,
      confirmaSenha
    ))
  }


  return (
    <>
      <View style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        gap: 20,
      }}>

        <TextInput style={styles.input}
          onChangeText={value => setNome(value)}
          placeholder="Nome" />
        <TextInput style={styles.input}
          onChangeText={value => setSobreNome(value)}
          placeholder="Sobrenome" />
        <TextInput style={styles.input}
          onChangeText={value => setCidade(value)}
          placeholder="Cidade" />
        <TextInput style={styles.input}
          onChangeText={value => setEmail(value)}
          placeholder="E-mail" />
        <TextInput style={styles.input}
          onChangeText={value => setSenha(value)}
          secureTextEntry={true} placeholder="Senha" />
        <TextInput style={styles.input}
          onChangeText={value => setConfirmaSenha(value)}
          secureTextEntry={true} placeholder="Confirma senha" />

        <TouchableOpacity style={{
          padding: 10,
          width: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F59230',
          borderRadius: 10,
          borderWidth: 0,
        }} onPress={data}>
          <Text style={{
            fontSize: 17,
            color: "#fff",
            fontWeight: 'bold',
          }}>
            Cadastar-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          padding: 10
        }} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#FFF', fontSize: 17 }}>
            Já tenho conta
          </Text>
        </TouchableOpacity>
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 300,
    height: 50,
    borderWidth: 0,
    fontSize: 22,
  },
});
