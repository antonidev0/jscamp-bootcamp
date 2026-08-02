// Se queda como string
let cualquiercosa: any = "Hola mundo"
// pasa a number
cualquiercosa = 30
// ahora a booleano
cualquiercosa = true
// y se que cualquiercosa es de tipo any, por lo que puedo hacer cualquier operación con ella
const resultado = cualquiercosa + 10

console.log(resultado) // 40

// interfaces para objetos, el resto para types