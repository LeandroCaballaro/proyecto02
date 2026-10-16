import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import ImgEncabezado from '../../assets/enca.jpg'
import Chat from './Chat'

const Home = () => {
  const [mostrarChat, setMostrarChat] = useState(false)

  if (mostrarChat) {
    return <Chat onVolver={() => setMostrarChat(false)} />
  }

  return (
    <View style={styles.pantalla}>
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Image
          source={ImgEncabezado}
          alt='FondoEncabezado'
          style={styles.ImgEncabezado}
        />
        <View style={styles.menuNav}>
          <Text style={styles.Titulo}>☰</Text>

          <View style={styles.menu}>
            <Text style={styles.item}>Productos</Text>
          </View>
          <View style={styles.menu}>
            <Text style={styles.item}>Galeria</Text>
          </View>
          <View style={styles.menu}>
            <Text style={styles.item}>Contactos</Text>
          </View>
        </View>
      </ScrollView>

      {/* Boton flotante que abre el asistente */}
      <Pressable style={styles.botonChat} onPress={() => setMostrarChat(true)}>
        <Text style={styles.botonChatTexto}>Chat</Text>
      </Pressable>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
  },
  ImgEncabezado: {
    width: '100%',
    height: 250,
  },
  botonChat: {
    position: 'absolute',
    right: 20,
    bottom: 32,
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 22,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  botonChatTexto: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
})
