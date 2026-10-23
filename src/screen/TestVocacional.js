import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { preguntas, CARRERAS } from '../test-vocacional/preguntas'
import { calcularResultado } from '../test-vocacional/calculo'

const ESCUELA = 'E.E.S.T. N°1 Cecilia Berdichevski'

const TestVocacional = ({ onVolver }) => {
  // 'inicio' -> 'preguntas' -> 'resultado'
  const [etapa, setEtapa] = useState('inicio')
  const [indice, setIndice] = useState(0)
  const [respuestas, setRespuestas] = useState([])

  const comenzar = () => {
    setRespuestas([])
    setIndice(0)
    setEtapa('preguntas')
  }

  const responder = (carrera) => {
    const nuevas = respuestas.slice(0, indice).concat([carrera])
    setRespuestas(nuevas)
    if (indice + 1 < preguntas.length) setIndice(indice + 1)
    else setEtapa('resultado')
  }

  const anterior = () => {
    if (indice > 0) setIndice(indice - 1)
  }

  const renderInicio = () => (
    <View style={styles.tarjeta}>
      <Text style={styles.tituloTarjeta}>¿Informática o Programación?</Text>
      <Text style={styles.parrafo}>
        Respondé {preguntas.length} preguntas cortas y te mostramos qué
        orientación de la {ESCUELA} va más con vos.
      </Text>
      <Text style={styles.parrafo}>
        No hay respuestas correctas ni incorrectas. Si ninguna opción te
        representa, elegí la neutra.
      </Text>
      <Pressable style={styles.botonPrincipal} onPress={comenzar}>
        <Text style={styles.textoBotonPrincipal}>Comenzar test</Text>
      </Pressable>
    </View>
  )

  const renderPregunta = () => {
    const pregunta = preguntas[indice]
    const progreso = (indice / preguntas.length) * 100
    return (
      <View>
        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length}
        </Text>
        <View style={styles.barraProgreso}>
          <View style={[styles.rellenoProgreso, { width: progreso + '%' }]} />
        </View>
        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>{pregunta.texto}</Text>
          {pregunta.opciones.map((opcion) => {
            const elegida = respuestas[indice] === opcion.carrera
            return (
              <Pressable
                key={opcion.texto}
                style={[styles.opcion, elegida && styles.opcionElegida]}
                onPress={() => responder(opcion.carrera)}
              >
                <Text style={styles.textoOpcion}>{opcion.texto}</Text>
              </Pressable>
            )
          })}
        </View>
        {indice > 0 ? (
          <Pressable style={styles.botonSecundario} onPress={anterior}>
            <Text style={styles.textoBotonSecundario}>Pregunta anterior</Text>
          </Pressable>
        ) : null}
      </View>
    )
  }

  const renderBarra = (carrera, porcentaje) => (
    <View key={carrera.clave} style={styles.filaResultado}>
      <View style={styles.encabezadoResultado}>
        <Text style={styles.nombreCarrera}>{carrera.nombre}</Text>
        <Text style={[styles.porcentaje, { color: carrera.color }]}>{porcentaje}%</Text>
      </View>
      <View style={styles.barraResultado}>
        <View
          style={[styles.rellenoResultado, { width: porcentaje + '%', backgroundColor: carrera.color }]}
        />
      </View>
    </View>
  )

  const renderResultado = () => {
    const resultado = calcularResultado(respuestas)
    const recomendada = resultado.recomendada
    return (
      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Tu resultado</Text>
        {recomendada ? (
          <Text style={styles.parrafo}>
            Tu perfil se inclina hacia{' '}
            <Text style={[styles.destacado, { color: recomendada.color }]}>
              {recomendada.nombre}
            </Text>
            .
          </Text>
        ) : (
          <Text style={styles.parrafo}>
            Quedaste empatado: las dos orientaciones van con tu perfil.
          </Text>
        )}

        {renderBarra(CARRERAS.informatica, resultado.informatica)}
        {renderBarra(CARRERAS.programacion, resultado.programacion)}

        {recomendada ? (
          <Text style={styles.parrafo}>{recomendada.descripcion}</Text>
        ) : null}
        <Text style={styles.nota}>
          El test deja un margen neutro para que el resultado quede
          balanceado: ninguna carrera supera el 70% ni baja del 30%. Es una
          orientación, no una decisión final; consultalo con tus profesores.
        </Text>

        <Pressable style={styles.botonPrincipal} onPress={comenzar}>
          <Text style={styles.textoBotonPrincipal}>Hacer el test de nuevo</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.pantalla}>
      <View style={styles.encabezado}>
        {onVolver ? (
          <Pressable onPress={onVolver} style={styles.botonEncabezado} hitSlop={8}>
            <Text style={styles.textoBotonEncabezado}>{'<'}</Text>
          </Pressable>
        ) : (
          <View style={styles.botonEncabezado} />
        )}
        <View style={styles.tituloContenedor}>
          <Text style={styles.titulo}>Test vocacional</Text>
          <Text style={styles.subtitulo}>{ESCUELA}</Text>
        </View>
        <View style={styles.botonEncabezado} />
      </View>

      <ScrollView contentContainerStyle={styles.contenido}>
        {etapa === 'inicio' ? renderInicio() : null}
        {etapa === 'preguntas' ? renderPregunta() : null}
        {etapa === 'resultado' ? renderResultado() : null}
      </ScrollView>
    </View>
  )
}

export default TestVocacional

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
  contenido: {
    padding: 16,
    paddingBottom: 40,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
  },
  tituloTarjeta: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  parrafo: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 12,
  },
  destacado: {
    fontWeight: '700',
  },
  nota: {
    fontSize: 13,
    lineHeight: 19,
    color: '#6b7280',
    marginBottom: 16,
  },
  contador: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
  },
  barraProgreso: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e5e7eb',
    marginBottom: 14,
    overflow: 'hidden',
  },
  rellenoProgreso: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  pregunta: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 14,
  },
  opcion: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  opcionElegida: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  textoOpcion: {
    fontSize: 15,
    color: '#1f2937',
  },
  filaResultado: {
    marginBottom: 14,
  },
  encabezadoResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nombreCarrera: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  porcentaje: {
    fontSize: 16,
    fontWeight: '700',
  },
  barraResultado: {
    height: 14,
    borderRadius: 7,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  rellenoResultado: {
    height: '100%',
  },
  botonPrincipal: {
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  textoBotonPrincipal: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  botonSecundario: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  textoBotonSecundario: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
})
