const fs = require('fs')
const _ = require('lodash')

const ELEMENTOS = 50
const TOMADOS = 5

/**
 * Este script calcula todas las posibles combinaciones
 * de 50 elementos tomados de 5 en 5, sin repetición, y cuyo orden
 * no importa, y las escribe en un fichero.
 * 
 * Equivale a todas las combinaciones de 5 números que pueden
 * aparecer en el Euromillón.
 */

// El primer número que vamos a analizar
const first = [...Buffer.alloc(ELEMENTOS)]
first.fill(1, first.length - TOMADOS)
// El último número de la serie
const last = [...Buffer.alloc(ELEMENTOS)]
last.fill(1, 0, TOMADOS)

/**
 * La estrategia a seguir para conseguir todas las combinaciones
 * es utilizar un array de 50 elementos binario, en el que cada posición
 * repesenta uno de los 50 números. Si la posición contiene el valor 1 significa
 * que el valor de esa posición entra como posibilidad. Si es 0 significa que
 * ese número está ausente.
 * Imagínalo como que el "1" representa una X sobre el número que queremos elegir
 * para participar.
 */

/**
 * Observa el patrón que se dibuja si ordenas todas las combinaciones
 * posibles de menos a mayor, teniendo en cuenta que cada combinación
 * es un array de 5 elementos.
 */


/**
 * nextCombination simplemente, calcula la siguiente combinación
 * en base a la primera combinación (first).
 * El resultado sustituye a la primera combinación.
 */
function nextCombination() {
  var stop = false;
  var number = 1;

  /**
   * Recorremos todo el array desde el final hasta el principio.
   */
  for (var i = first.length - 1; i >= 0 && !stop; i--) {

    /**
     * Si el número tiene una X, y el número inmediatamente después
     * no tiene una X, movemos la X al siguiente número.
     */
    if (first[i] === 1 && first[i - 1] === 0) {
      stop = true

      first[i] = 0
      first[i - 1] = 1


      /**
       * Si además, los DOS siguientes números tienen una X,
       * significa que hemos llegado a un tope.
       * Debemos reiniciar la posición de todos los números inferiores
       * al principio. Por ejemplo, si tenemos marcado el número 10, y además
       * está marcado el número 11, todas las X restantes deben comenzar
       * marcando 1, 2, 3...
       */
      if (first[i - 1] === 1) {

        /**
         * Borramos todas las X inferiores.
         */
        for (var j = i; j < first.length; j++) {
          first[j] = 0
        }

        /**
         * Calculamos cuántas X nos quedan por poner.
         */
        let numeros = 0;
        for (var j = 0; j < first.length; j++) {
          if (first[j] === 1) {
            numeros++
          }
        }

        /**
         * Marcamos los primeros números, del 1 al que sea (las X que
         * nos faltan).
         */
        for (var j = first.length - (TOMADOS - numeros); j < first.length; j++) {
          first[j] = 1
        }
      }
    }



    if (first[i] === 1) {
      number++;
    }
  }
}


/**
 * Esta función convierte el array binario en la combinación
 * de números que representa. Básicamente, crea un array de 5 números
 * basándose en la posición en la que se encuentran las X.
 */
function convertToNumbers() {
  let resultado = []

  for (var i = first.length - 1; i >= 0; i--) {
    if (first[i] === 1) {
      resultado.push(ELEMENTOS - i)
    }
  }

  return resultado;
}


/**
 * Este bucle final recorre todas las posibles combinaciones,
 * las transforma en un array de 5 dígitos legible, y la escribe
 * en un fichero.
 */
let fechaInicio = new Date();
let stop = false;
let i = 0;
while (!stop) {
  stop = _.isEqual(last, first)
  i++;


  // fs.appendFileSync('euro.txt', convertToNumbers() + '\n')



  /**
   * Si imprimes el array binario, o la representación numérica,
   * tarda 30 segundos. Y verás
   * en consola el bonito patrón que se dibuja.
   */
  // console.log(convertToNumbers())
  console.log(first.toString())

  /**
   * Si no imprimes nada, y sólo dejas que el bucle dé vueltas,
   * tardará 700 milisegundos.
   */
  nextCombination()
}

console.log(i)

console.log(new Date() - fechaInicio)

/**
 * Este último console.log muestra cuántas combinaciones en total
 * se han conseguido.
 *
 * Si todo ha ido bien, el resultado final debe ser 2118760
 * (Dos millones, ciento dieciocho mil, setecientos sesenta)
 */


/**
 * A efectos prácticos, a parte de obtener todas las posibles combinaciones,
 * quizás te interese medir el tiempo que se tarda en conseguirlas todas.
 */


