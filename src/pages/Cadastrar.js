import React, { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Cadastro = () => {
  const navigation = useNavigation()
  const [senhaValidar, setSenhaValidar] = useState('');

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const cadastrarUsuario = async () => {
    if (senha !== confirmaSenha) {
      // alert('As senhas não coincidem.');
      setSenhaValidar(true);
      setTimeout(() => setSenhaValidar(false), 2000);
      return;
    }

    const data = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      senha: senha,
      csenha: confirmaSenha,
    };

    try {
      const response = await fetch('http://192.168.15.14:80/API-Rota/cadUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        setNome('')
        setSobrenome('')
        setEmail('')
        setSenha('')
        setConfirmaSenha('')

      } else {
        const errorResponse = await response.json();
        alert(`Erro ao cadastrar usuário: ${errorResponse.message}`);
        setNome('')
        setSobrenome('')
        setEmail('')
        setSenha('')
        setConfirmaSenha('')
      }
    } catch (error) {
      alert('Erro ao realizar a requisição. Verifique sua conexão.');
      setNome('')
      setSobrenome('')
      setEmail('')
      setSenha('')
      setConfirmaSenha('')
    }
  };

  return (

    <View style={styles.container}>

      {senhaValidar && (
        <View style={{
          zIndex: 200,
          // borderWidth: 1,
          width: 220,
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
          }}>As senhas não coincidem</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(value) => setNome(value)}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        onChangeText={(value) => setSobrenome(value)}
        value={sobrenome}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        onChangeText={(value) => setCidade(value)}
        value={cidade}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(value) => setSenha(value)}
        value={senha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirma senha"
        secureTextEntry
        onChangeText={(value) => setConfirmaSenha(value)}
        value={confirmaSenha}
      />

      <TouchableOpacity style={{
        backgroundColor: '#F59230',
        padding: 10,
        borderRadius: 4,
        marginBottom: 15,
        margin: 10,
        width: '50%',
        alignItems: 'center',
      }} onPress={cadastrarUsuario}>
        <Text style={{
          fontSize: 17,
          fontWeight: 'bold',
          color: "#fff"
        }}>Cadastrar</Text>
      </TouchableOpacity>

      {/* ======= */}

      <TouchableOpacity style={{
        padding: 10,
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 0,
      }} onPress={() => navigation.goBack()}>
        <Text style={{
          fontSize: 17,
          fontWeight: 'bold',
          color: "#fff"
        }}>já tenho conta</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
    padding: 16,
  },
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


});

export default Cadastro;
