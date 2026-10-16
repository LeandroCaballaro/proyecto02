/**
 * Base de conocimiento del chatbot.
 *
 * Cada intencion tiene:
 *  - nombre:     identificador unico.
 *  - patrones:   frases de ejemplo contra las que se compara el mensaje.
 *  - respuestas: posibles contestaciones (se elige una al azar).
 *  - prioridad:  desempata cuando dos intenciones puntuan parecido.
 *  - requiere:   (opcional) solo se activa si la intencion anterior fue esta.
 *  - sugiere:    (opcional) atajos que la pantalla ofrece como botones.
 */

export const intenciones = [
  {
    nombre: 'saludo',
    prioridad: 1.1,
    patrones: [
      'hola', 'buenas', 'buen dia', 'buenas tardes', 'buenas noches',
      'hey', 'que tal', 'como estas', 'holis', 'saludos',
    ],
    respuestas: [
      'Hola! Soy el asistente del proyecto. En que te puedo ayudar?',
      'Buenas! Pregunta lo que necesites sobre el sitio.',
      'Hola, que bueno verte por aca. Que estabas buscando?',
    ],
    sugiere: ['Ver productos', 'Horarios', 'Contacto'],
  },
  {
    nombre: 'despedida',
    prioridad: 1.1,
    patrones: [
      'chau', 'adios', 'nos vemos', 'hasta luego', 'me voy',
      'bye', 'hasta la proxima', 'buenas noches me voy',
    ],
    respuestas: [
      'Chau! Cualquier cosa volve a escribirme.',
      'Nos vemos, gracias por pasar.',
      'Hasta luego! Que te vaya bien.',
    ],
  },
  {
    nombre: 'agradecimiento',
    prioridad: 1.05,
    patrones: ['gracias', 'muchas gracias', 'te agradezco', 'gracias igual', 'genial gracias'],
    respuestas: [
      'De nada! Para eso estoy.',
      'No hay por que. Algo mas?',
      'Un gusto ayudar.',
    ],
  },
  {
    nombre: 'identidad',
    patrones: [
      'quien sos', 'que sos', 'como te llamas', 'cual es tu nombre',
      'sos un robot', 'sos una persona', 'sos humano', 'sos una inteligencia artificial',
    ],
    respuestas: [
      'Soy un chatbot escrito a mano en JavaScript, sin librerias de terceros. Comparo lo que escribis con mi base de conocimiento y elijo la respuesta mas parecida.',
      'Soy un bot del proyecto: nada de servicios externos, solo reglas y similitud de texto.',
    ],
  },
  {
    nombre: 'capacidades',
    patrones: [
      'que podes hacer', 'para que servis', 'en que me podes ayudar',
      'ayuda', 'ayudame', 'opciones', 'menu', 'que sabes',
    ],
    respuestas: [
      'Te puedo contar sobre los productos, la galeria, los horarios, los medios de pago, los envios y como contactarnos.',
      'Pregunta por productos, precios, envios, horarios o contacto y te oriento.',
    ],
    sugiere: ['Ver productos', 'Envios', 'Medios de pago', 'Contacto'],
  },
  {
    nombre: 'productos',
    patrones: [
      'que productos tienen', 'ver productos', 'catalogo', 'que venden',
      'mostrame los productos', 'lista de productos', 'articulos', 'mercaderia',
      'productos',
    ],
    respuestas: [
      'En la seccion Productos esta el catalogo completo con fotos y precios. Queres que te cuente de los precios o de los envios?',
      'Tenemos el catalogo cargado en la seccion Productos. Decime si te interesa algo puntual.',
    ],
    sugiere: ['Precios', 'Envios', 'Galeria'],
  },
  {
    nombre: 'precios',
    patrones: [
      'cuanto sale', 'cuanto cuesta', 'que precio tiene', 'precios',
      'lista de precios', 'es caro', 'cuanto vale', 'tienen descuentos', 'hay promociones',
      'precio', 'promociones', 'descuentos',
    ],
    respuestas: [
      'Cada producto muestra su precio actualizado en la seccion Productos. Las promociones vigentes aparecen destacadas.',
      'Los precios estan publicados junto a cada articulo del catalogo y se actualizan seguido.',
    ],
    sugiere: ['Ver productos', 'Medios de pago'],
  },
  {
    nombre: 'medios_pago',
    patrones: [
      'como puedo pagar', 'medios de pago', 'aceptan tarjeta', 'se puede pagar en efectivo',
      'aceptan transferencia', 'pago en cuotas', 'formas de pago', 'aceptan debito',
      'pago', 'pagar', 'tarjeta',
    ],
    respuestas: [
      'Se puede pagar en efectivo, por transferencia o con tarjeta de debito y credito. Con credito hay cuotas segun el banco.',
      'Aceptamos efectivo, transferencia y tarjetas. Consultanos por las cuotas disponibles.',
    ],
    sugiere: ['Envios', 'Precios'],
  },
  {
    nombre: 'envios',
    patrones: [
      'hacen envios', 'mandan a domicilio', 'cuanto tarda el envio', 'envio gratis',
      'delivery', 'llega a mi casa', 'costo de envio', 'hacen entregas',
      'envio', 'envios',
    ],
    respuestas: [
      'Si, hacemos envios. En la ciudad llega en 24 a 48 horas y al interior entre 3 y 5 dias habiles.',
      'Hay envio a domicilio y tambien podes retirar en el local sin costo.',
    ],
    sugiere: ['Horarios', 'Ubicacion', 'Medios de pago'],
  },
  {
    nombre: 'horarios',
    patrones: [
      'que horario tienen', 'a que hora abren', 'a que hora cierran', 'horarios',
      'abren los sabados', 'atienden los domingos', 'estan abiertos ahora', 'horario',
    ],
    respuestas: [
      'Atendemos de lunes a viernes de 9 a 18 y los sabados de 9 a 13. Domingos cerrado.',
      'El horario es de 9 a 18 en semana y hasta las 13 los sabados.',
    ],
    sugiere: ['Ubicacion', 'Contacto'],
  },
  {
    nombre: 'ubicacion',
    patrones: [
      'donde estan', 'cual es la direccion', 'como llego', 'donde queda el local',
      'tienen local', 'ubicacion', 'en que zona estan', 'direccion',
    ],
    respuestas: [
      'Estamos en el local del centro; la direccion exacta y el mapa estan en la seccion Contactos.',
      'La direccion con el mapa esta publicada en Contactos.',
    ],
    sugiere: ['Horarios', 'Contacto'],
  },
  {
    nombre: 'contacto',
    patrones: [
      'como los contacto', 'telefono', 'cual es el mail', 'correo',
      'tienen whatsapp', 'redes sociales', 'instagram', 'quiero hablar con alguien',
      'contacto', 'mail', 'whatsapp',
    ],
    respuestas: [
      'En la seccion Contactos estan el telefono, el mail y las redes. Tambien respondemos por WhatsApp en horario comercial.',
      'Podes escribirnos por mail o WhatsApp; los datos estan en Contactos.',
    ],
    sugiere: ['Horarios', 'Ubicacion'],
  },
  {
    nombre: 'galeria',
    patrones: [
      'ver galeria', 'tienen fotos', 'mostrame imagenes', 'galeria de imagenes',
      'fotos de los productos', 'imagenes', 'galeria', 'fotos',
    ],
    respuestas: [
      'La galeria tiene fotos del local y de los trabajos hechos. Esta en el menu, en Galeria.',
      'Hay una galeria con imagenes reales en la seccion Galeria.',
    ],
    sugiere: ['Ver productos'],
  },
  {
    nombre: 'reclamo',
    patrones: [
      'quiero hacer un reclamo', 'me llego mal', 'esta roto', 'quiero devolver algo',
      'reclamo', 'devolucion',
      'no me llego el pedido', 'tengo un problema con mi compra', 'quiero cambiar un producto',
    ],
    respuestas: [
      'Lamento el inconveniente. Tenes 10 dias para cambios y devoluciones presentando el comprobante. Escribinos por Contactos con el numero de pedido y lo resolvemos.',
      'Perdon por eso. Mandanos el numero de pedido por Contactos y lo vemos enseguida.',
    ],
    sugiere: ['Contacto'],
  },
  {
    nombre: 'proyecto',
    patrones: [
      'de que es este proyecto', 'que es esta app', 'quien hizo esto',
      'con que esta hecho', 'que tecnologias usa', 'es un trabajo practico',
    ],
    respuestas: [
      'Es un proyecto educativo de la materia P.D.I.W.M, hecho con React Native y Expo. El chatbot esta programado desde cero en JavaScript.',
      'Esta app es un trabajo practico en React Native con Expo; el asistente no usa ninguna libreria de chatbot.',
    ],
    sugiere: ['Quien sos'],
  },
  {
    nombre: 'como_funciona_bot',
    patrones: [
      'como funcionas', 'como estas programado', 'usas inteligencia artificial',
      'como entendes lo que escribo', 'que algoritmo usas',
    ],
    respuestas: [
      'Normalizo tu mensaje (minusculas, sin acentos, sin puntuacion), lo corto en palabras, las reduzco a su raiz y lo comparo con mis patrones usando similitud del coseno, distancia de Levenshtein y n-gramas. Gana la intencion con mejor puntaje.',
      'Es todo logica propia: normalizacion, tokenizado, stemming y tres metricas de similitud combinadas. Si ninguna llega al umbral, te pido que reformules.',
    ],
  },
  {
    nombre: 'afirmacion',
    prioridad: 0.9,
    patrones: ['si', 'claro', 'dale', 'obvio', 'si por favor', 'me interesa', 'contame'],
    respuestas: [
      'Perfecto. Decime sobre que tema queres que profundice.',
      'Buenisimo, preguntame lo que precises.',
    ],
  },
  {
    nombre: 'negacion',
    prioridad: 0.9,
    patrones: ['no', 'no gracias', 'nada mas', 'por ahora no', 'esta bien asi'],
    respuestas: [
      'Dale, cualquier cosa me escribis.',
      'Sin problema. Quedo por aca si necesitas algo.',
    ],
  },
  {
    nombre: 'insulto',
    prioridad: 1.2,
    patrones: ['sos un inutil', 'no servis para nada', 'que malo sos', 'no entendes nada'],
    respuestas: [
      'Puede ser, todavia tengo poco conocimiento cargado. Proba preguntando de otra forma y lo intento de nuevo.',
      'Perdon si no te ayude. Decimelo mas simple y pruebo otra vez.',
    ],
  },
]

/** Respuestas para cuando ninguna intencion supera el umbral de confianza. */
export const respuestasDesconocidas = [
  'No te entendi bien. Lo podes escribir de otra forma?',
  'Eso todavia no lo tengo cargado. Probá preguntando por productos, envios, horarios o contacto.',
  'No encontre nada parecido en mi base. Decimelo con otras palabras?',
]

/** Respuesta cuando el usuario manda un mensaje vacio. */
export const respuestaVacia = 'Escribime algo y te contesto.'
