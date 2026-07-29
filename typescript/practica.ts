const sum = (a, b) => a + b
const result = sum("1", "24")
console.log(result) // 4 — suma correctamente

const nombre = "Juan"

let edad = 30

let isDeveloper : boolean
// console.log(nombre * 2 );

// nombre = "Pedro" // Error: Cannot assign to 'nombre' because it is a constant.

// string
const nombre2: string = "Juan"

// valor
let valor: undefined

let otro: null

let age: number | null = null

// arrays
const numbers: number[] = [1, 2, 3, 4, 5]
numbers.push(6)
const hobbies: string[] = ["Correr", "Dormir", "Comer"]
hobbies.push("Estudiar")

const mixto: (string | number)[] = ["Juan", 30, "Pedro", 25]

// objeto

// type User = {
//   readonly name: string;
//   age: number;
//   email?: string;
// };

 

// muy util para definir la estructura de un objeto y
// sus propiedades, incluyendo si son opcionales o de solo lectura
// muy util para la ia
type Configuration = {
    readonly apiKey: string;
    readonly baseUrl: string;
};

// tipo anidado

// puede ser
type Product = {
    id: number;
    name: string;
    price: number;
    category: {
        id: number;
        name: string;
    };
};

// pero la mejor forma es usar interfaces

type Category = {
  id: number;
  name: string;
};

type Product2 = {
  id: number;
  name: string;
  price: number;
  category: Category;
};

// literal types crea valores en concreto de tipo string, number o boolean
type Direction = "up" | "down" | "left" | "right";
type SiNo = "si" | "no" | true | false | 1 | 0;

const ciudad = "Madrid"; 


type UserId = string | number; 

export type User = {
  id: UserId;
  name: string;
  age: number;
  email?: string;
};

type userEntity = User & { id: UserId };

const userEntity: userEntity = {
  id: 123,
  name: "Juan",
  age: 30,
  email: "Email",
};