const _ = require('lodash')

class GeneraCombinaciones {
  constructor(elementos, tomados) {
    this.ELEMENTOS = elementos
    this.TOMADOS = tomados

    this.CURRENT = [...Buffer.alloc(this.ELEMENTOS)]
    this.LAST = [...Buffer.alloc(this.ELEMENTOS)]

    this.reiniciar();
  }

  reiniciar() {
    this.CURRENT.fill(1, this.CURRENT.length - this.TOMADOS)
    this.LAST.fill(1, 0, this.TOMADOS)
  }

  nextCombination() {
    var stop = false;
    for (var i = this.CURRENT.length - 1; i >= 0 && !stop; i--) {
      if (this.CURRENT[i] === 1 && this.CURRENT[i - 1] === 0) {
        stop = true

        this.CURRENT[i] = 0
        this.CURRENT[i - 1] = 1

        if (this.CURRENT[i - 1] === 1) {

          for (var j = i; j < this.CURRENT.length; j++) {
            this.CURRENT[j] = 0
          }

          let numeros = 0;
          for (var j = 0; j < this.CURRENT.length; j++) {
            if (this.CURRENT[j] === 1) {
              numeros++
            }
          }

          for (var j = this.CURRENT.length - (this.TOMADOS - numeros); j < this.CURRENT.length; j++) {
            this.CURRENT[j] = 1
          }
        }
      }
    }
  }

  convertToNumbers() {
    let resultado = []

    for (var i = this.CURRENT.length - 1; i >= 0; i--) {
      if (this.CURRENT[i] === 1) {
        resultado.push(this.ELEMENTOS - i)
      }
    }

    return resultado;
  }

  convertToBinary() {
    return this.CURRENT.toString()
  }

  hasEnded() {
    return _.isEqual(this.LAST, this.CURRENT)
  }
}

module.exports =   GeneraCombinaciones;