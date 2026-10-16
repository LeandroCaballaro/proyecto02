/**
 * Motor del chatbot.
 *
 * Recibe el texto del usuario y decide que responder:
 *   1. normaliza y tokeniza el mensaje,
 *   2. lo compara contra cada patron de cada intencion,
 *   3. se queda con la intencion de mejor puntaje,
 *   4. si el puntaje no llega al umbral, responde que no entendio.
 *
 * Tambien guarda un poco de contexto (ultima intencion, nombre del usuario)
 * para que la conversacion no arranque de cero en cada mensaje.
 */
import { normalizar, esPregunta } from './normalizador'
import { tokenizarRaices } from './tokenizador'
import { similitud } from './similitud'
import {
  intenciones as intencionesPorDefecto,
  respuestasDesconocidas,
  respuestaVacia,
} from './base-conocimiento'

const UMBRAL_CONFIANZA = 0.42
// Por debajo del umbral pero por encima de esto, el bot repregunta en vez de
// decir directamente que no entendio.
const UMBRAL_DUDA = 0.3

export class ChatBot {
  constructor(opciones) {
    const config = opciones || {}
    this.intenciones = config.intenciones || intencionesPorDefecto
    this.umbral = config.umbral !== undefined ? config.umbral : UMBRAL_CONFIANZA
    this.contexto = {
      ultimaIntencion: null,
      nombreUsuario: null,
      mensajes: 0,
    }
    // Intencion que quedo en duda y espera confirmacion del usuario.
    this.ultimaDuda = null
    // Los patrones se tokenizan una sola vez al construir el bot: es lo mas
    // caro del proceso y no cambia entre mensajes.
    this.indice = this.intenciones.map((intencion) => ({
      intencion,
      patrones: intencion.patrones.map((p) => tokenizarRaices(p)),
    }))
  }

  /** Elige un elemento al azar de una lista. */
  elegirAlAzar(lista) {
    if (!lista || lista.length === 0) return ''
    const posicion = Math.floor(Math.random() * lista.length)
    return lista[posicion]
  }

  /**
   * Intenta sacar el nombre del usuario de frases como "me llamo Ana".
   * Devuelve el nombre o null.
   */
  detectarNombre(texto) {
    const limpio = normalizar(texto)
    const disparadores = ['me llamo', 'mi nombre es', 'soy']
    for (let i = 0; i < disparadores.length; i++) {
      const disparador = disparadores[i]
      const posicion = limpio.indexOf(disparador)
      if (posicion !== 0) continue
      const resto = limpio.slice(disparador.length).trim()
      if (resto.length === 0) continue
      const primera = resto.split(' ')[0]
      // "soy un robot" no es un nombre: se descartan palabras muy cortas.
      if (primera.length < 3) continue
      return primera.charAt(0).toUpperCase() + primera.slice(1)
    }
    return null
  }

  /**
   * Puntua todas las intenciones contra el mensaje ya tokenizado.
   * Devuelve la lista ordenada de mayor a menor puntaje.
   */
  puntuar(tokensMensaje) {
    const resultados = []
    for (let i = 0; i < this.indice.length; i++) {
      const entrada = this.indice[i]
      const intencion = entrada.intencion

      // Intenciones que solo tienen sentido despues de otra.
      if (intencion.requiere && intencion.requiere !== this.contexto.ultimaIntencion) {
        continue
      }

      let mejor = 0
      for (let j = 0; j < entrada.patrones.length; j++) {
        const puntaje = similitud(tokensMensaje, entrada.patrones[j])
        if (puntaje > mejor) mejor = puntaje
      }

      const prioridad = intencion.prioridad !== undefined ? intencion.prioridad : 1
      resultados.push({ intencion, puntaje: mejor * prioridad, crudo: mejor })
    }
    resultados.sort((a, b) => b.puntaje - a.puntaje)
    return resultados
  }

  /**
   * Procesa un mensaje y devuelve un objeto con la respuesta y los datos
   * del analisis (sirve tanto para mostrar en pantalla como para depurar).
   */
  responder(textoUsuario) {
    const texto =
      textoUsuario === undefined || textoUsuario === null ? '' : String(textoUsuario)
    this.contexto.mensajes++

    if (normalizar(texto).length === 0) {
      return {
        texto: respuestaVacia,
        intencion: 'vacio',
        confianza: 0,
        sugerencias: [],
      }
    }

    const nombre = this.detectarNombre(texto)
    if (nombre !== null && this.contexto.nombreUsuario === null) {
      this.contexto.nombreUsuario = nombre
      this.contexto.ultimaIntencion = 'presentacion'
      return {
        texto: 'Encantado, ' + nombre + '! Contame en que te puedo ayudar.',
        intencion: 'presentacion',
        confianza: 1,
        sugerencias: ['Que podes hacer', 'Ver productos'],
      }
    }

    const tokens = tokenizarRaices(texto)
    const ranking = this.puntuar(tokens)
    const mejor = ranking.length > 0 ? ranking[0] : null

    // Si el mensaje anterior quedo en duda, un "si" confirma esa intencion
    // y un "no" la descarta. Se chequea antes que el resto del ranking.
    if (this.contexto.ultimaIntencion === 'duda' && this.ultimaDuda !== null && mejor !== null) {
      if (mejor.intencion.nombre === 'afirmacion' && mejor.puntaje >= UMBRAL_DUDA) {
        const recuperada = this.ultimaDuda
        this.ultimaDuda = null
        this.contexto.ultimaIntencion = recuperada.nombre
        return {
          texto: this.elegirAlAzar(recuperada.respuestas),
          intencion: recuperada.nombre,
          confianza: 1,
          sugerencias: recuperada.sugiere || [],
        }
      }
      if (mejor.intencion.nombre === 'negacion' && mejor.puntaje >= UMBRAL_DUDA) {
        this.ultimaDuda = null
        this.contexto.ultimaIntencion = 'negacion'
        return {
          texto: 'Perdon, entonces reformulalo y lo intento de nuevo.',
          intencion: 'negacion',
          confianza: 1,
          sugerencias: ['Que podes hacer'],
        }
      }
    }

    if (mejor === null || mejor.puntaje < UMBRAL_DUDA) {
      this.contexto.ultimaIntencion = 'desconocido'
      return {
        texto: this.elegirAlAzar(respuestasDesconocidas),
        intencion: 'desconocido',
        confianza: mejor === null ? 0 : mejor.puntaje,
        sugerencias: ['Que podes hacer', 'Ver productos', 'Contacto'],
      }
    }

    // Zona de duda: hay algo parecido pero no lo suficiente, asi que se
    // confirma con el usuario en lugar de arriesgar una respuesta mala.
    if (mejor.puntaje < this.umbral) {
      this.contexto.ultimaIntencion = 'duda'
      this.ultimaDuda = mejor.intencion
      const tema = mejor.intencion.nombre.split('_').join(' ')
      return {
        texto: 'No estoy seguro de haber entendido. Me estas preguntando por ' + tema + '?',
        intencion: 'duda',
        confianza: mejor.puntaje,
        sugerencias: ['Si', 'No'],
      }
    }

    this.contexto.ultimaIntencion = mejor.intencion.nombre
    this.ultimaDuda = null

    let respuesta = this.elegirAlAzar(mejor.intencion.respuestas)
    // Pequeno toque de contexto: usar el nombre de vez en cuando.
    if (
      this.contexto.nombreUsuario !== null &&
      mejor.intencion.nombre === 'saludo'
    ) {
      respuesta = 'Hola de nuevo, ' + this.contexto.nombreUsuario + '! ' + respuesta
    }
    // Si venia con signo de pregunta y la intencion es un saludo, se agrega
    // una invitacion a preguntar.
    if (esPregunta(texto) && mejor.intencion.nombre === 'saludo') {
      respuesta += ' Todo bien por aca, gracias por preguntar.'
    }

    return {
      texto: respuesta,
      intencion: mejor.intencion.nombre,
      confianza: Math.min(1, mejor.puntaje),
      sugerencias: mejor.intencion.sugiere || [],
    }
  }

  /** Mensaje de bienvenida para abrir la conversacion. */
  bienvenida() {
    return {
      texto: 'Hola! Soy el asistente del proyecto, programado desde cero en JavaScript. Preguntame por productos, envios, horarios o contacto.',
      intencion: 'bienvenida',
      confianza: 1,
      sugerencias: ['Que podes hacer', 'Ver productos', 'Horarios', 'Contacto'],
    }
  }

  /** Borra el contexto para arrancar una conversacion nueva. */
  reiniciar() {
    this.contexto = { ultimaIntencion: null, nombreUsuario: null, mensajes: 0 }
    this.ultimaDuda = null
  }
}

export default ChatBot
