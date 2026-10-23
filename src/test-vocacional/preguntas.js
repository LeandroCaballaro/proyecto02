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

export const preguntas = [
  {
    texto: 'Si se rompe la computadora de tu casa, ¿qué hacés?',
    opciones: [
      { texto: 'La abro para ver qué pieza falla', carrera: 'informatica' },
      { texto: 'Busco si es un error del programa y trato de arreglarlo', carrera: 'programacion' },
      { texto: 'Le pido ayuda a alguien que sepa', carrera: null },
    ],
  },
  {
    texto: '¿Qué te gustaría crear o armar?',
    opciones: [
      { texto: 'Una red de computadoras para un aula', carrera: 'informatica' },
      { texto: 'Un videojuego o una app para el celular', carrera: 'programacion' },
      { texto: 'Las dos cosas me interesan igual', carrera: null },
    ],
  },
  {
    texto: '¿Qué materia te resulta más entretenida?',
    opciones: [
      { texto: 'Tecnología / Electrónica', carrera: 'informatica' },
      { texto: 'Matemática (resolver problemas paso a paso)', carrera: 'programacion' },
      { texto: 'Ninguna en especial', carrera: null },
    ],
  },
  {
    texto: 'Cuando usás una aplicación, ¿qué te da más curiosidad?',
    opciones: [
      { texto: 'En qué equipo o servidor está funcionando', carrera: 'informatica' },
      { texto: 'Cómo está hecho el código por dentro', carrera: 'programacion' },
      { texto: 'Solo me interesa usarla', carrera: null },
    ],
  },
  {
    texto: '¿Cómo preferís trabajar?',
    opciones: [
      { texto: 'Con las manos: cables, placas y herramientas', carrera: 'informatica' },
      { texto: 'Sentado frente a la pantalla escribiendo instrucciones', carrera: 'programacion' },
      { texto: 'Me adapto a cualquiera de las dos', carrera: null },
    ],
  },
  {
    texto: 'Un amigo no tiene Internet en su casa. Vos...',
    opciones: [
      { texto: 'Reviso el router, los cables y la configuración', carrera: 'informatica' },
      { texto: 'Le armo un programa que avise cuando se corta la conexión', carrera: 'programacion' },
      { texto: 'Lo intento, pero no sé si lo resolvería', carrera: null },
    ],
  },
  {
    texto: '¿Qué tarea te parece más desafiante?',
    opciones: [
      { texto: 'Instalar y configurar un sistema operativo', carrera: 'informatica' },
      { texto: 'Encontrar el error en un programa que no anda', carrera: 'programacion' },
      { texto: 'Las dos me parecen igual de difíciles', carrera: null },
    ],
  },
  {
    texto: '¿Te gustan los acertijos de lógica y los rompecabezas?',
    opciones: [
      { texto: 'No mucho, prefiero algo más práctico', carrera: 'informatica' },
      { texto: 'Sí, me encantan', carrera: 'programacion' },
      { texto: 'A veces', carrera: null },
    ],
  },
  {
    texto: '¿En qué trabajo te imaginás en el futuro?',
    opciones: [
      { texto: 'Técnico de soporte o administrador de redes', carrera: 'informatica' },
      { texto: 'Desarrollador de software o diseñador de apps', carrera: 'programacion' },
      { texto: 'Todavía no lo sé', carrera: null },
    ],
  },
  {
    texto: 'Si tuvieras que mejorar el laboratorio de la escuela, ¿qué harías?',
    opciones: [
      { texto: 'Actualizar las computadoras y ordenar el cableado', carrera: 'informatica' },
      { texto: 'Hacer un sistema para registrar préstamos y turnos', carrera: 'programacion' },
      { texto: 'Cualquiera de las dos ideas me sirve', carrera: null },
    ],
  },
  {
    texto: '¿Qué video mirarías primero?',
    opciones: [
      { texto: '"Cómo armar una PC gamer desde cero"', carrera: 'informatica' },
      { texto: '"Creá tu primera página web en 10 minutos"', carrera: 'programacion' },
      { texto: 'Me daría lo mismo', carrera: null },
    ],
  },
  {
    texto: 'Cuando algo sale mal, ¿qué te sale más natural?',
    opciones: [
      { texto: 'Probar cambiando piezas o configuraciones hasta que funcione', carrera: 'informatica' },
      { texto: 'Pensar paso a paso qué instrucción falló', carrera: 'programacion' },
      { texto: 'Depende de la situación', carrera: null },
    ],
  },
]
