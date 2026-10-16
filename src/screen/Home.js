import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
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
  )
}

export default Home

const styles = StyleSheet.create({
  ImgEncabezado: {
    width: '100%',
    height: 250,
  }

})