const GeneraCombinaciones = require('./lib/genera_combinaciones')
const fs = require('fs')
const Estrellas = new GeneraCombinaciones(12, 2)

const fechaInicio = new Date();


let stop = false;
let estrellas = []

while (!stop) {
  stop = Estrellas.hasEnded()
  estrellas.push(Estrellas.convertToNumbers())
  Estrellas.nextCombination()
}

const Numeros = new GeneraCombinaciones(50, 5)

stop = false;

var i = 0
while (!stop) {
  stop = Numeros.hasEnded()
  const value = Numeros.convertToNumbers()

  for (var i = 0; i < estrellas.length; i++) {
    const finalValue = [...value, ...estrellas[i]]
    fs.appendFileSync('euro_total.txt', finalValue + '\n')
    i++
  }

  Numeros.nextCombination()
}

console.log(i)
console.log(new Date() - fechaInicio + 'ms')
