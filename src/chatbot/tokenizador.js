/**
 * Tokenizador y reductor morfologico (stemmer) simple para espanol.
 * Convierte una frase en una lista de raices comparables.
 */
import { normalizar } from './normalizador'

// Palabras muy frecuentes que no aportan al significado de la intencion.
const VACIAS = [
  'a', 'al', 'algo', 'algun', 'alguna', 'ante', 'aqui', 'asi', 'aun', 'cada',
  'como', 'con', 'contra', 'cual', 'cuando', 'de', 'del', 'desde', 'donde',
  'dos', 'e', 'el', 'ella', 'ellos', 'en', 'entre', 'era', 'eres', 'es',
  'esa', 'ese', 'eso', 'esta', 'estan', 'este', 'esto', 'estoy', 'ha', 'hay',
  'la', 'las', 'le', 'les', 'lo', 'los', 'mas', 'me', 'mi', 'mucho', 'muy',
  'ni', 'no', 'nos', 'o', 'otra', 'otro', 'para', 'pero', 'por', 'porque',
  'que', 'se', 'ser', 'si', 'sin', 'sobre', 'son', 'su', 'sus', 'tambien',
  'te', 'tiene', 'tu', 'un', 'una', 'uno', 'unos', 'y', 'ya', 'yo',
]

const SET_VACIAS = {}
for (let i = 0; i < VACIAS.length; i++) SET_VACIAS[VACIAS[i]] = true

// Sufijos ordenados de mas largo a mas corto: siempre se recorta el primero
// que coincida para no comerse de mas una palabra corta.
const SUFIJOS = [
  'aciones', 'amientos', 'imientos', 'amiento', 'imiento',
  'adores', 'adoras', 'ancias', 'encias', 'aciones',
  'idades', 'ividad', 'adora', 'ador', 'ancia', 'encia',
  'mente', 'able', 'ible', 'ista', 'oso', 'osa',
  'ciones', 'cion', 'sion', 'dades', 'dad',
  'eis', 'ais', 'emos', 'amos', 'imos', 'aban', 'ian', 'aba', 'ia',
  'ando', 'iendo', 'ado', 'ido', 'ada', 'ida',
  'are', 'ere', 'ire', 'ar', 'er', 'ir',
  'es', 's',
]

const LARGO_MINIMO_RAIZ = 4

/** Recorta el sufijo flexivo/derivativo mas largo que aplique. */
export function raiz(palabra) {
  if (palabra.length <= LARGO_MINIMO_RAIZ) return palabra
  for (let i = 0; i < SUFIJOS.length; i++) {
    const sufijo = SUFIJOS[i]
    if (palabra.length - sufijo.length < LARGO_MINIMO_RAIZ) continue
    const final = palabra.slice(palabra.length - sufijo.length)
    if (final === sufijo) return palabra.slice(0, palabra.length - sufijo.length)
  }
  return palabra
}

/** Parte la frase normalizada en palabras. */
export function tokenizar(texto) {
  const limpio = normalizar(texto)
  if (limpio.length === 0) return []
  return limpio.split(' ')
}

/** Tokens utiles: sin palabras vacias y ya reducidos a su raiz. */
export function tokenizarRaices(texto) {
  const tokens = tokenizar(texto)
  const salida = []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (SET_VACIAS[token] === true) continue
    salida.push(raiz(token))
  }
  // Si todo el mensaje eran palabras vacias ("y que?"), conviene quedarse con
  // los tokens crudos antes que devolver una lista vacia.
  return salida.length > 0 ? salida : tokens
}

/** Genera los n-gramas de caracteres de una palabra (para comparar tipeos). */
export function ngramas(palabra, n) {
  const tamano = n || 3
  const relleno = '_' + palabra + '_'
  const salida = []
  if (relleno.length < tamano) return [relleno]
  for (let i = 0; i + tamano <= relleno.length; i++) {
    salida.push(relleno.slice(i, i + tamano))
  }
  return salida
}

export const palabrasVacias = VACIAS
