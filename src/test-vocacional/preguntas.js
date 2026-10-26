/**
 * Preguntas del test vocacional de la E.E.S.T. N°1 Cecilia Berdichevski.
 *
 * Ayuda a elegir entre las dos orientaciones:
 *  - Informatica:  hardware, redes, soporte tecnico y sistemas operativos.
 *  - Programacion: desarrollo de software, algoritmos, apps y bases de datos.
 *
 * Cada pregunta tiene tres opciones:
 *  - una que suma a Informatica,
 *  - una que suma a Programacion,
 *  - una neutra (suma la mitad a cada una) para quien no se inclina.
 */

export const CARRERAS = {
  informatica: {
    clave: 'informatica',
    nombre: 'Informática',
    color: '#0d9488',
    descripcion:
      'Te vas a formar en armado y reparación de computadoras, redes, ' +
      'instalación de sistemas operativos, servidores y soporte técnico.',
  },
  programacion: {
    clave: 'programacion',
    nombre: 'Programación',
    color: '#7c3aed',
    descripcion:
      'Te vas a formar en lógica, algoritmos, desarrollo de aplicaciones ' +
      'web y móviles, bases de datos y trabajo con lenguajes de programación.',
  },
}

// Las preguntas no hablan de computadoras a proposito: miden gustos y formas
// de pensar para que la respuesta "correcta" no sea obvia.
//  - Informatica: lo practico, lo fisico, reparar, trabajar con gente.
//  - Programacion: lo abstracto, la logica, planificar, crear desde cero.
export const preguntas = [
  {
    texto: 'Tenés un sábado libre. ¿Qué plan te tienta más?',
    opciones: [
      { texto: 'Desarmar un aparato viejo para ver cómo es por dentro', carrera: 'informatica' },
      { texto: 'Inventar las reglas de un juego de mesa nuevo', carrera: 'programacion' },
      { texto: 'Salir con amigos y ver qué surge', carrera: null },
    ],
  },
  {
    texto: 'En un trabajo en grupo, ¿qué rol tomás casi siempre?',
    opciones: [
      { texto: 'Organizo los pasos y reparto las tareas', carrera: 'programacion' },
      { texto: 'Consigo los materiales y armo la maqueta', carrera: 'informatica' },
      { texto: 'El que haga falta en ese momento', carrera: null },
    ],
  },
  {
    texto: '¿Qué te deja más satisfecho?',
    opciones: [
      { texto: 'Que vuelva a andar algo que estaba roto', carrera: 'informatica' },
      { texto: 'Encontrar la forma más corta de resolver un problema', carrera: 'programacion' },
      { texto: 'Terminar algo a tiempo, sea lo que sea', carrera: null },
    ],
  },
  {
    texto: 'Te toca armar un mueble que viene en caja. ¿Cómo arrancás?',
    opciones: [
      { texto: 'Leo todo el instructivo y sigo el orden exacto', carrera: 'programacion' },
      { texto: 'Empiezo a encastrar piezas y me guío por cómo van quedando', carrera: 'informatica' },
      { texto: 'Le dejo la tarea a otro', carrera: null },
    ],
  },
  {
    texto: '¿En qué tipo de trabajo te ves más cómodo?',
    opciones: [
      { texto: 'Uno en el que me muevo y trato con gente distinta cada día', carrera: 'informatica' },
      { texto: 'Uno en el que me concentro horas en un mismo proyecto', carrera: 'programacion' },
      { texto: 'Me adapto a cualquiera de los dos', carrera: null },
    ],
  },
  {
    texto: '¿Cuál de estos juegos elegís?',
    opciones: [
      { texto: 'Ajedrez o sudoku', carrera: 'programacion' },
      { texto: 'Un juego de construir o de taller mecánico', carrera: 'informatica' },
      { texto: 'Ninguno me llama mucho', carrera: null },
    ],
  },
  {
    texto: 'Tenés que hacer la misma tarea aburrida todos los días. ¿Qué pensás?',
    opciones: [
      { texto: 'Ordeno el lugar y las herramientas para hacerla más rápido', carrera: 'informatica' },
      { texto: 'Busco un método para que se haga casi sola', carrera: 'programacion' },
      { texto: 'La hago y listo', carrera: null },
    ],
  },
  {
    texto: 'Mirando un semáforo, ¿qué te da más curiosidad?',
    opciones: [
      { texto: 'La regla que decide cuánto dura cada color', carrera: 'programacion' },
      { texto: 'Cómo le llega la electricidad y qué pasa si se corta', carrera: 'informatica' },
      { texto: 'Nunca me lo pregunté', carrera: null },
    ],
  },
  {
    texto: 'Cuando aprendés algo nuevo, preferís...',
    opciones: [
      { texto: 'Probarlo con las manos aunque me equivoque', carrera: 'informatica' },
      { texto: 'Entender primero la lógica y después practicar', carrera: 'programacion' },
      { texto: 'Que alguien me lo muestre una vez', carrera: null },
    ],
  },
  {
    texto: 'En Matemática, ¿qué es lo que más disfrutás?',
    opciones: [
      { texto: 'Resolver problemas de varios pasos razonando', carrera: 'programacion' },
      { texto: 'Medir y calcular cosas que puedo ver y tocar', carrera: 'informatica' },
      { texto: 'No disfruto mucho Matemática', carrera: null },
    ],
  },
  {
    texto: 'Si tuvieras tu propio emprendimiento, sería...',
    opciones: [
      { texto: 'Un local donde la gente viene a que le soluciones problemas', carrera: 'informatica' },
      { texto: 'Un producto creado desde cero que use mucha gente', carrera: 'programacion' },
      { texto: 'Todavía no me imagino uno', carrera: null },
    ],
  },
  {
    texto: '¿Qué te frustra más?',
    opciones: [
      { texto: 'Un error que no entiendo por qué pasó', carrera: 'programacion' },
      { texto: 'Algo que no funciona y no puedo abrir para revisarlo', carrera: 'informatica' },
      { texto: 'Las dos cosas por igual', carrera: null },
    ],
  },
]
