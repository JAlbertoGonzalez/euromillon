#!/usr/bin/env node

const fs = require('fs')

/**
 * Esta es una forma bruta y poco eficiente de calcular todas
 * las posibles combinaciones del Euromillón.
 * 
 * Utiliza un array que representa un número binario de 50 bits.
 * Cada bit, si está activado (1), representa la presencia de la posición en la que se encuentra.
 * Si está desactivado (0), representa la ausencia.
 * 
 * Por ejemplo, el número binario 101 significa la combinación 1 y 3, ya que el primer bit y el tercer bit están activados.
 * El número 2 no estaría presente, ya que está desactivado.
 * 
 * Por tanto hay que recorrer todas las posibles combinaciones desde 0
 * hasta 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
 * 
 * En decimal, sería un bucle que dé 1267650600228229401496703205375 vueltas.
 * En cada vuelta, se calcula el valor binario y se cuenta el número de unos.
 * Si hay en total 5 unos, es una combinación válida del euromillón.
 * 
 * Al final del bucle, se habrán obtenido todas las posibles combinaciones.
 * 
 * Es poco eficiente, porque solo 2118760 son combinaciones válidas.
 * 
 * Pero abre la posibilidad a realizar otras combinaciones.
 * 
 * Lee el fichero combinaciones_eficiente.js para obtener un script que recorra sólo
 * las combinaciones válidas, sin necesidad de pasar por las combinaciones no válidas, es
 * decir, que realiza exactamente 2118760 iteraciones.
 */

class BaseBuffer {
  constructor(length, base) {
    this.value = Buffer.alloc(length)
    this.base = base
    this.finish = Buffer.alloc(length)
    this.finish.fill(base - 1)
  }

  sum(amount = 1) {
    this.value[this.value.length - 1] = this.value[this.value.length - 1] + amount

    let stop = false
    for (var i = this.value.length - 1; i >= 0 && !stop; i--) {
      if (this.value[i] >= this.base) {
        const resto = this.value[i] - this.base + 1
        this.value[i - 1] = this.value[i - 1] + resto;
        this.value[i] = 0;
      } else {
        stop = true
      }
    }
  }

  toString() {
    return this.value
  }

  finishValue() {
    return this.finish
  }

  countRepetitions(value) {
    let repetitions = 0;
    for (var i = 0; i < this.value.length; i++) {
      if (this.value[i] === value) { repetitions++ }
    }
    return repetitions;
  }
}

var numero = new BaseBuffer(50, 2)

console.log('START WRITTING')

let i = 0
let stop = false
while (!stop) {

  stop = numero.finishValue().compare(numero.toString()) === 0

  if (numero.countRepetitions(1) === 5) {
    const value = numero.toString().toString('hex')
    fs.appendFileSync('euromillones.txt', value + '\r\n')
  }
  i++;
  numero.sum(1)
}

