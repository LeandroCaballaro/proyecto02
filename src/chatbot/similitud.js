/**
 * Metricas de similitud entre textos, implementadas a mano.
 * Se combinan tres miradas distintas porque cada una falla donde la otra
 * acierta: coseno mira que palabras comparten, Levenshtein tolera los
 * errores de tipeo y los n-gramas atrapan palabras escritas a medias.
 */
import { ngramas, tokenizarRaices } from './tokenizador'

/**
 * Distancia de edicion de Levenshtein.
 * Usa solo dos filas de la matriz para no reservar memoria de mas.
 */
export function levenshtein(a, b) {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let anterior = []
  for (let j = 0; j <= b.length; j++) anterior.push(j)

  for (let i = 1; i <= a.length; i++) {
    const actual = [i]
    for (let j = 1; j <= b.length; j++) {
      const costoSustituir = a[i - 1] === b[j - 1] ? 0 : 1
      const borrar = anterior[j] + 1
      const insertar = actual[j - 1] + 1
      const sustituir = anterior[j - 1] + costoSustituir
      actual[j] = Math.min(borrar, insertar, sustituir)
    }
    anterior = actual
  }
  return anterior[b.length]
}

/** Levenshtein llevado a un puntaje de 0 a 1 (1 = identicas). */
export function parecidoPalabras(a, b) {
  const largo = Math.max(a.length, b.length)
  if (largo === 0) return 1
  return 1 - levenshtein(a, b) / largo
}

/** Cuenta cuantas veces aparece cada token: la bolsa de palabras. */
export function bolsaDePalabras(tokens) {
  const bolsa = {}
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    bolsa[t] = (bolsa[t] || 0) + 1
  }
  return bolsa
}

/** Similitud del coseno entre dos bolsas de palabras. */
export function coseno(bolsaA, bolsaB) {
  let producto = 0
  let normaA = 0
  let normaB = 0

  const clavesA = Object.keys(bolsaA)
  for (let i = 0; i < clavesA.length; i++) {
    const clave = clavesA[i]
    const valor = bolsaA[clave]
    normaA += valor * valor
    if (bolsaB[clave] !== undefined) producto += valor * bolsaB[clave]
  }
  const clavesB = Object.keys(bolsaB)
  for (let i = 0; i < clavesB.length; i++) {
    const valor = bolsaB[clavesB[i]]
    normaB += valor * valor
  }

  if (normaA === 0 || normaB === 0) return 0
  return producto / (Math.sqrt(normaA) * Math.sqrt(normaB))
}

/** Indice de Jaccard sobre los n-gramas de caracteres de las dos frases. */
export function jaccardNgramas(tokensA, tokensB) {
  const conjuntoA = {}
  const conjuntoB = {}

  for (let i = 0; i < tokensA.length; i++) {
    const partes = ngramas(tokensA[i], 3)
    for (let j = 0; j < partes.length; j++) conjuntoA[partes[j]] = true
  }
  for (let i = 0; i < tokensB.length; i++) {
    const partes = ngramas(tokensB[i], 3)
    for (let j = 0; j < partes.length; j++) conjuntoB[partes[j]] = true
  }

  const clavesA = Object.keys(conjuntoA)
  const clavesB = Object.keys(conjuntoB)
  if (clavesA.length === 0 || clavesB.length === 0) return 0

  let interseccion = 0
  for (let i = 0; i < clavesA.length; i++) {
    if (conjuntoB[clavesA[i]] === true) interseccion++
  }
  const union = clavesA.length + clavesB.length - interseccion
  return union === 0 ? 0 : interseccion / union
}

/**
 * Cobertura tolerante a errores: por cada token del patron busca el token
 * mas parecido del mensaje y promedia esos mejores parecidos.
 */
export function coberturaDifusa(tokensMensaje, tokensPatron) {
  if (tokensPatron.length === 0 || tokensMensaje.length === 0) return 0
  let acumulado = 0
  for (let i = 0; i < tokensPatron.length; i++) {
    let mejor = 0
    for (let j = 0; j < tokensMensaje.length; j++) {
      const p = parecidoPalabras(tokensPatron[i], tokensMensaje[j])
      if (p > mejor) mejor = p
    }
    // Un parecido flojo es ruido, no coincidencia.
    acumulado += mejor >= 0.7 ? mejor : 0
  }
  return acumulado / tokensPatron.length
}

/**
 * Puntaje final entre un mensaje y un patron, combinando las tres metricas.
 * Los pesos se eligieron para que la cobertura difusa mande (es la que mejor
 * aguanta el tipeo real) sin ignorar el resto.
 */
export function similitud(tokensMensaje, tokensPatron) {
  if (tokensMensaje.length === 0 || tokensPatron.length === 0) return 0
  const porCoseno = coseno(bolsaDePalabras(tokensMensaje), bolsaDePalabras(tokensPatron))
  const porNgramas = jaccardNgramas(tokensMensaje, tokensPatron)
  const porCobertura = coberturaDifusa(tokensMensaje, tokensPatron)
  return porCobertura * 0.5 + porCoseno * 0.3 + porNgramas * 0.2
}
