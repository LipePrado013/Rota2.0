import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Modal, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ImagemModal({ imagem, fecharModal }) {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.container}>
        <Image source={{ uri: imagem }} style={styles.imagem} />
        <TouchableOpacity style={styles.fechar} onPress={fecharModal}>
          <AntDesign name="closecircle" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000009e',
  },
  imagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fechar: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
});
