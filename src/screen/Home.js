import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ImgEncabezado from '../../assets/enca.jpg'
const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Image
        source={ImgEncabezado}
        alt='FondoEncabezado'
        style={styles.ImgEncabezado}
      />
      <View style={styles.menuNav}>
        <text style={styles.Titulo}>☰</text>

        <View style={styles.menu}>
          <text style={styles.item}>Productos</text>
        </View>
        <View style={styles.menu}>
          <text style={styles.item}>Gsleria</text>
        </View>
        <View style={styles.menu}>
          <text style={styles.item}>Contactos</text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  ImgEncabezado: {
    width: '100%',
    height: 250,
  }

})