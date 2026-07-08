import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Fondo from './assets/Fondo/Logo.gif'
import { useState } from 'react';
import Home from './src/screen/Home'
export default function App() {
  const [Pagina, setPagina] = useState('')

  const Redirect = setTimeout(() => {
    setPagina('Home')
  }, 10000);

  if (Pagina == 'Home') {
    return <Home />
  }
  return (
    <ImageBackground
      source={Fondo}
      style={styles.ImgFondo}
    />
  );
}

const styles = StyleSheet.create({
  ImgFondo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
