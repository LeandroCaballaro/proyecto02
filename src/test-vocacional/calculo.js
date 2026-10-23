/**
 * Calculo del resultado del test vocacional.
 *
 * 1. Se suman los puntos de cada carrera (la opcion neutra suma la mitad a
 *    cada una).
 * 2. Se saca la proporcion "cruda" de cada carrera.
 * 3. La proporcion cruda se comprime para que ninguna carrera quede por
 *    encima del 70% ni por debajo del 30%. Asi, aunque todas las respuestas
 *    apunten a una sola carrera, el resultado queda balanceado (70% / 30%)
 *    y nunca se ve un 80% / 20% o un 90% / 10%.
 *
 * Para eso se deja un margen neutro: el 30% de cada lado queda fijo y solo
 * el 40% del medio se reparte segun las respuestas.
 */
import { CARRERAS } from './preguntas'

// Rango en el que siempre queda cada carrera.
export const PORCENTAJE_MINIMO = 30
export const PORCENTAJE_MAXIMO = 70

/**
 * Recibe las respuestas como lista de claves de carrera
 * ('informatica', 'programacion' o null para la neutra).
 */
export function calcularResultado(respuestas) {
  let informatica = 0
  let programacion = 0

  respuestas.forEach((carrera) => {
    if (carrera === 'informatica') informatica += 1
    else if (carrera === 'programacion') programacion += 1
    else {
      informatica += 0.5
      programacion += 0.5
    }
  })

  const total = informatica + programacion
  // Sin respuestas no hay inclinacion: queda en 50 / 50.
  const proporcionCruda = total === 0 ? 0.5 : informatica / total

  // De la proporcion cruda (0 a 1) se pasa al rango 30% - 70%.
  const porcentajeInformatica = Math.round(
    PORCENTAJE_MINIMO + proporcionCruda * (PORCENTAJE_MAXIMO - PORCENTAJE_MINIMO)
  )
  const porcentajeProgramacion = 100 - porcentajeInformatica

  let recomendada = null
  if (porcentajeInformatica > porcentajeProgramacion) recomendada = CARRERAS.informatica
  else if (porcentajeProgramacion > porcentajeInformatica) recomendada = CARRERAS.programacion

  return {
    informatica: porcentajeInformatica,
    programacion: porcentajeProgramacion,
    // null cuando empatan: las dos carreras le quedan igual de bien.
    recomendada,
  }
}
