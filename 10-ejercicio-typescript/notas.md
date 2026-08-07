TypeScript en general

Qué es TypeScript: un lenguaje de programación que añade tipado estático opcional a JavaScript.
(el tipado es un tipo de dato especifico que le damos a una, variable, funcion o propiedad)
Ejemplo: 

const edad: number = 25

Tipo: una etiqueta que le dice a TypeScript qué clase de dato puede tener una variable.
Ejemplo: 

let nombre: string = "Ana"

Tipos básicos (primitivos)

Los mas nuevas para mi:

any: tipo comodín que desactiva la verificación de tipos (acepta cualquier cosa).
Ejemplo: 
let dato: any = "hola"; 
dato = 5; 
(no da error, pero pierdes la protección)

void: tipo para funciones que no devuelven nada.
Ejemplo: 

function saludar(): void {
     console.log("hola") 
     }

Date: tipo nativo para fechas.
Ejemplo: 
let fecha: Date = new Date()

Tipos literales y uniones

type: palabra para crear un tipo con nombre propio, reutilizable.
Ejemplo: 

type ID = string

Tipo literal: un tipo que solo permite valores exactos de una lista cerrada.
Ejemplo: 

type Nivel = 'junior' | 'senior' 
(solo esos dos valores)

Union type (|): un tipo que puede ser una de varias opciones.
Ejemplo: 

let valor: string | number (texto o número)

Union type discriminado: una unión donde una propiedad común indica cuál forma es.
Ejemplo: 

{ success: true; data: string } | { success: false; error: string } 

(el success distingue)

Objetos

interface: un molde que describe la estructura que debe tener un objeto (Usar para objetos).
Ejemplo: interface Job { id: string; title: string }

Propiedad opcional (?): marca una propiedad que puede no estar presente.
Ejemplo: 

salary?: number 
(el objeto es válido con o sin salary)

extends: hace que una interface herede todas las propiedades de otra y agregue más.
Ejemplo: 

interface DetailedJob extends Job { 
    benefits: string[] 
    }

Arrays y tuplas

Array tipado (Tipo[]): una lista donde todos los elementos son de un mismo tipo.
Ejemplo: 
let nombres: string[] = ["Ana", "Luis"]

Tupla: un array de longitud fija donde cada posición tiene un tipo definido.
Ejemplo: 
let coord: [number, number] = [40.4, -3.7]

Tupla con etiquetas: una tupla con nombre en cada posición (solo para claridad).
Ejemplo: 

type Coord = [lat: number, long: number]

Funciones

Función tipada: una función con tipos en sus parámetros y en su retorno.
Ejemplo: 
function sumar(a: number, b: number): number { 
    return a + b 
    }

Parámetro tipado: define de qué tipo es cada entrada de la función.
Ejemplo: 

function saludar(nombre: string) 

(nombre debe ser texto)

Tipo de retorno: define qué tipo devuelve la función (va tras los paréntesis).
Ejemplo: 

function esActivo(): boolean { 
    return true 
    } 


Type Narrowing

Type narrowing: cuando TypeScript deduce un tipo más preciso dentro de un bloque según una comprobación.
Ejemplo: dentro de 
if (x === undefined), TypeScript sabe que x es undefined ahí.

Type guard: una comprobación que "protege" el uso de un valor descartando casos.
Ejemplo: 
if (salary === undefined) return;
salary.toLocaleString() (tras el if, ya es number seguro)

Utility Types

Utility type: un tipo incorporado que transforma otro tipo existente.
Ejemplo: 
Partial<Job> 

(crea una versión de Job).

Partial<T>: convierte todas las propiedades de un tipo en opcionales.
Ejemplo: 
updates: Partial<Job> 
(puedes mandar solo los campos que cambian)

Pick<T, 'a' | 'b'>: crea un tipo con solo algunas propiedades seleccionadas de otro.
Ejemplo: 
type Resumen = Pick<Job, 'id' | 'title'> (solo id y title)

Readonly<T>: hace que las propiedades de un tipo sean inmutables (no modificables).
Ejemplo: 
Readonly<Job> (no puedes hacer job.title = "otro")