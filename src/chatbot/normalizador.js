/**
 * Normalizador de texto.
 * Deja el texto en una forma canonica para poder comparar lo que escribe
 * el usuario contra la base de conocimiento sin que molesten las mayusculas,
 * los acentos o los signos de puntuacion.
 */

// Mapa de caracteres acentuados -> caracter base. Se hace a mano para no
// depender de String.prototype.normalize('NFD'), que en Hermes puede variar.
const ACENTOS = {
  á: 'a', à: 'a', ä: 'a', â: 'a', ã: 'a', å: 'a',
  é: 'e', è: 'e', ë: 'e', ê: 'e',
  í: 'i', ì: 'i', ï: 'i', î: 'i',
  ó: 'o', ò: 'o', ö: 'o', ô: 'o', õ: 'o',
  ú: 'u', ù: 'u', ü: 'u', û: 'u',
  ñ: 'n', ç: 'c', ý: 'y',
}

/** Pasa a minusculas y saca los acentos. */
export function sacarAcentos(texto) {
  let salida = ''
  const minuscula = String(texto).toLowerCase()
  for (let i = 0; i < minuscula.length; i++) {
    const caracter = minuscula[i]
    salida += ACENTOS[caracter] !== undefined ? ACENTOS[caracter] : caracter
  }
  return salida
}

/**
 * Colapsa letras repetidas de mas (holaaaaa -> holaa) dejando como maximo
 * dos iguales seguidas, asi "holaaaa" y "hola" terminan parecidos.
 */
export function colapsarRepetidas(texto) {
  let salida = ''
  let repeticiones = 0
  for (let i = 0; i < texto.length; i++) {
    if (i > 0 && texto[i] === texto[i - 1]) {
      repeticiones++
      if (repeticiones >= 2) continue
    } else {
      repeticiones = 0
    }
    salida += texto[i]
  }
  return salida
}

/**
 * Normalizacion completa: minusculas, sin acentos, sin puntuacion,
 * sin espacios de sobra y sin letras estiradas.
 */
export function normalizar(texto) {
  if (texto === null || texto === undefined) return ''
  let salida = sacarAcentos(texto)
  let limpio = ''
  for (let i = 0; i < salida.length; i++) {
    const c = salida[i]
    const esLetra = c >= 'a' && c <= 'z'
    const esDigito = c >= '0' && c <= '9'
    limpio += esLetra || esDigito ? c : ' '
  }
  limpio = colapsarRepetidas(limpio)
  return limpio.split(' ').filter((p) => p.length > 0).join(' ')
}

/** Detecta si el mensaje original venia con signo de pregunta. */
export function esPregunta(textoOriginal) {
  const t = String(textoOriginal)
  return t.indexOf('?') !== -1 || t.indexOf('¿') !== -1
}
