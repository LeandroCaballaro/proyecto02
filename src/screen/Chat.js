import React, { useRef, useState, useMemo, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { ChatBot } from '../chatbot/motor'

/** Contador para que cada mensaje tenga una key estable en la lista. */
let proximoId = 0
function nuevoId() {
  proximoId++
  return 'msg-' + proximoId
}

const Chat = ({ onVolver }) => {
  // El bot se crea una sola vez: mantiene el contexto de la conversacion.
  const bot = useMemo(() => new ChatBot(), [])
  const lista = useRef(null)

  const bienvenida = useMemo(() => bot.bienvenida(), [bot])
  const [mensajes, setMensajes] = useState([
    { id: nuevoId(), de: 'bot', texto: bienvenida.texto },
  ])
  const [sugerencias, setSugerencias] = useState(bienvenida.sugerencias)
  const [borrador, setBorrador] = useState('')
  const [escribiendo, setEscribiendo] = useState(false)

  const irAlFinal = useCallback(() => {
    if (lista.current) lista.current.scrollToEnd({ animated: true })
  }, [])

  const enviar = useCallback(
    (textoCrudo) => {
      const texto = String(textoCrudo).trim()
      if (texto.length === 0 || escribiendo) return

      const delUsuario = { id: nuevoId(), de: 'usuario', texto }
      setMensajes((previos) => previos.concat([delUsuario]))
      setBorrador('')
      setSugerencias([])
      setEscribiendo(true)

      // Se calcula la respuesta y se muestra con una demora corta para que
      // se lea como una conversacion y no como un salto instantaneo.
      const respuesta = bot.responder(texto)
      setTimeout(() => {
        setMensajes((previos) =>
          previos.concat([
            {
              id: nuevoId(),
              de: 'bot',
              texto: respuesta.texto,
              intencion: respuesta.intencion,
              confianza: respuesta.confianza,
            },
          ])
        )
        setSugerencias(respuesta.sugerencias || [])
        setEscribiendo(false)
      }, 450)
    },
    [bot, escribiendo]
  )

  const reiniciar = useCallback(() => {
    bot.reiniciar()
    const nueva = bot.bienvenida()
    setMensajes([{ id: nuevoId(), de: 'bot', texto: nueva.texto }])
    setSugerencias(nueva.sugerencias)
    setBorrador('')
    setEscribiendo(false)
  }, [bot])

  const renderMensaje = ({ item }) => {
    const esBot = item.de === 'bot'
    return (
      <View style={[styles.fila, esBot ? styles.filaBot : styles.filaUsuario]}>
        <View style={[styles.burbuja, esBot ? styles.burbujaBot : styles.burbujaUsuario]}>
          <Text style={esBot ? styles.textoBot : styles.textoUsuario}>{item.texto}</Text>
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.encabezado}>
        {onVolver ? (
          <Pressable onPress={onVolver} style={styles.botonEncabezado} hitSlop={8}>
            <Text style={styles.textoBotonEncabezado}>{'<'}</Text>
          </Pressable>
        ) : (
          <View style={styles.botonEncabezado} />
        )}
        <View style={styles.tituloContenedor}>
          <Text style={styles.titulo}>Asistente</Text>
          <Text style={styles.subtitulo}>{escribiendo ? 'escribiendo...' : 'en linea'}</Text>
        </View>
        <Pressable onPress={reiniciar} style={styles.botonEncabezado} hitSlop={8}>
          <Text style={styles.textoBotonEncabezado}>↺</Text>
        </Pressable>
      </View>

      <FlatList
        ref={lista}
        data={mensajes}
        renderItem={renderMensaje}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContenido}
        onContentSizeChange={irAlFinal}
        keyboardShouldPersistTaps="handled"
      />

      {escribiendo ? (
        <View style={styles.escribiendo}>
          <ActivityIndicator size="small" color="#6b7280" />
          <Text style={styles.escribiendoTexto}>El asistente esta escribiendo</Text>
        </View>
      ) : null}

      {sugerencias.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sugerencias}
          keyboardShouldPersistTaps="handled"
        >
          {sugerencias.map((sugerencia) => (
            <Pressable
              key={sugerencia}
              style={styles.chip}
              onPress={() => enviar(sugerencia)}
            >
              <Text style={styles.chipTexto}>{sugerencia}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <View style={styles.barraEntrada}>
        <TextInput
          style={styles.entrada}
          value={borrador}
          onChangeText={setBorrador}
          placeholder="Escribi tu mensaje..."
          placeholderTextColor="#9ca3af"
          multiline
          onSubmitEditing={() => enviar(borrador)}
          returnKeyType="send"
        />
        <Pressable
          style={[styles.botonEnviar, borrador.trim().length === 0 && styles.botonEnviarApagado]}
          onPress={() => enviar(borrador)}
          disabled={borrador.trim().length === 0 || escribiendo}
        >
          <Text style={styles.textoBotonEnviar}>Enviar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Chat

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 14,
    paddingHorizontal: 12,
    backgroundColor: '#1f2937',
  },
  botonEncabezado: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotonEncabezado: {
    color: '#ffffff',
    fontSize: 20,
  },
  tituloContenedor: {
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitulo: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  listaContenido: {
    padding: 12,
    paddingBottom: 4,
  },
  fila: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filaBot: {
    justifyContent: 'flex-start',
  },
  filaUsuario: {
    justifyContent: 'flex-end',
  },
  burbuja: {
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  burbujaBot: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 4,
  },
  burbujaUsuario: {
    backgroundColor: '#2563eb',
    borderTopRightRadius: 4,
  },
  textoBot: {
    color: '#111827',
    fontSize: 15,
    lineHeight: 21,
  },
  textoUsuario: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 21,
  },
  escribiendo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 6,
  },
  escribiendoTexto: {
    marginLeft: 8,
    color: '#6b7280',
    fontSize: 12,
  },
  sugerencias: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipTexto: {
    color: '#1f2937',
    fontSize: 13,
  },
  barraEntrada: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  entrada: {
    flex: 1,
    maxHeight: 110,
    minHeight: 42,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: '#111827',
  },
  botonEnviar: {
    marginLeft: 8,
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 18,
  },
  botonEnviarApagado: {
    backgroundColor: '#9ca3af',
  },
  textoBotonEnviar: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
})
