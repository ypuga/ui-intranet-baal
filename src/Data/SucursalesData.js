import TDCMC from '../assets/TDC_MC.png'
import TDCGODL from '../assets/TDC_GLD.png'
import TDCPLATINUM from '../assets/TDC_PLN.png'
import ALAMEDAEXPRESS from '../assets/alamedaExpress.jpg'
import CUENTALAMEDA from '../assets/cuentaAlameda.jpg'
import INVERSION from '../assets/inversionAlameda.jpg'

export const sucursales = [
    '914 - CENTRO SAN MIGUEL EL ALTO',
    '393 - CENTRO SAN JUAN DE LOS LAGOS',
    '292 - CENTRO TEPATITLAN DE MORELOS',
    '994 - CENTRO ARANDAS',
    '1002 - CENTRO ATOTONILCO',
    '999 - ONLINE'
  ]

export const generos = [
  'MASCULINO',
  'FEMENINO',
  'NO BINARIO'
]

export const estadosMexico = [
  'AGUASCALIENTES',
  'BAJA CALIFORNIA',
  'BAJA CALIFORNIA SUR',
  'CAMPECHE',
  'CHIAPAS',
  'CHIHUAHUA',
  'CIUDAD DE MÉXICO',
  'COAHUILA',
  'COLIMA',
  'DURANGO',
  'GUANAJUATO',
  'GUERRERO',
  'HIDALGO',
  'JALISCO',
  'ESTADO DE MÉXICO',
  'MICHOACÁN',
  'MORELOS',
  'NAYARIT',
  'NUEVO LEÓN',
  'OAXACA',
  'PUEBLA',
  'QUERÉTARO',
  'QUINTANA ROO',
  'SAN LUIS POTOSÍ',
  'SINALOA',
  'SONORA',
  'TABASCO',
  'TAMAULIPAS',
  'TLAXCALA',
  'VERACRUZ',
  'YUCATÁN',
  'ZACATECAS'
];

export const productos = [
  'CLIENTE UNICO',
  'ALAMEDA EXPRESS',
  'CUENTA ALAMEDA',
  'INVERSION ALAMEDA'
];

export const parentezco = [
  'Madre/Padre',
  'Hijo(a)',
  'Hermano(a)',
  'Abuelo(a)',
  'Tío(a)',
  'Primo(a)',
  'Nieto(a)',
  'Cuñado(a)',
  'Sobrino(a)',
  'Padrastro/Madrastra',
  'Hijastro(a)',
  'Suegro(a)',
  'Yerno/Nuera',
  'Padrino/Madrina',
  'Ahijado(a)',
];

export const mismoDomicilio = [
  'Si',
  'No'
]

export const criteriosBusqueda = [
  'ID Cliente Unico',
  'CURP',
]

export const cardsData = [
  {
    "title": "ALAMEDA MASTER CARD",
    "minIncome": "INGRESO MINIMO: $ 7,000",
    "benefits": [
      "Sin Anualidad para titular y adicional",
      "Hasta 6 MSI en todas tus compras en ALAMEDA",
      "Promociones especiales en varios comercios"
    ],
    "image": TDCMC,
    "altText": "Imagen de tarjeta ALAMEDA MASTER CARD",
    "disabled": false,
    "product": 'TDC MASTER CARD'
  },
  {
    "title": "BANCO ALAMEDA GOLD",
    "minIncome": "INGRESO MINIMO: $ 10,000",
    "benefits": [
      "Anualidad $ 750 + IVA",
      "Hasta 5% en CashBack en todas tus compras",
      "MSI en pagos de salud y colegiatura"
    ],
    "image": TDCGODL,
    "altText": "Imagen de tarjeta BANCO ALAMEDA GOLD",
    "disabled": false,
    "product": 'TDC GOLD'
  },
  {
    "title": "BANCO ALAMEDA PLATINUM",
    "minIncome": "INGRESO MINIMO: $ 50,000",
    "benefits": [
      "Anualidad $ 2,000 + IVA",
      "Hasta 5% en CashBack en todas tus compras",
      "Mastercard Global Service te brindan asistencia en todo el mundo 24/7",
      "Acceso a salas Priority Pass"
    ],
    "image": TDCPLATINUM,
    "altText": "Imagen de tarjeta BANCO ALAMEDA GOLD",
    "disabled": true,
    "product": 'TDC PLATINUM'
  },
]

export const accountData = [
  {
    "title": "ALAMEDA EXPRESS",
    "id": '125',
    "benefits": [
      "Depositos mensuales limitados a 30,000 UDIS",
      "Sin monto minimo de apertura",
      "Sin comision mensual por manejo de cuenta",
      "Retira en efectivo en comercios afiliados",
    ],
    "image": ALAMEDAEXPRESS,
    "altText": "Imagen cuenta alameda express",
    "disabled": false,
  },
  {
    "title": "CUENTA ALAMEDA",
    "id": '125',
    "benefits": [
      "Depositos mensuales ilimitados",
      "Sin monto minimo de apertura",
      "Trae tu nomina y evita el manejo de cuenta",
      "Paquete unico de beneficios",
    ],
    "image": CUENTALAMEDA,
    "altText": "Imagen cuenta alameda express",
    "disabled": false,
  },
  {
    "title": "INVERSION ALAMEDA",
    "id": '125',
    "benefits": [
      "Tasa anual de 12.5%",
      "Apertura tu cuenta con minimo $ 10,000 MXN",
      "GAT REAL de 7.30 %",
    ],
    "image": INVERSION,
    "altText": "Imagen cuenta alameda express",
    "disabled": false,
  }
]

export const criteriosBusquedaClientes = [
  { "value": "CURP", "label": 'CURP', "maxLength": 18 },
  { "value": "NOMBRE_CLIENTE", "label": 'Nombre del Cliente:', "maxLength": 99 },
  { "value": "RFC", "label": 'RFC', "maxLength": 13 },
  { "value": "ID_CLIENTE_UNICO", "label": 'Id Cliente Unico:', "maxLength": 10 }
];