<!-- Aquí puedes poner tus dudas sobre el ejercicio -->

para el segundo ejercicio:

No seria mejor usar>

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary?: number // Opcional
  technologies: Technology[]
  experienceLevel: ExperienceLevel
  workMode: WorkMode
  isActive: boolean
  postedDate: Date
}

para los Object, que son objetos complejos? no se si entendi bien esa parte

**Respuesta:** Bien! Buena pregunta, para typar elementos simples, como lo es un objeto, puedes usar `type` o `interface`, no hay diferencia. En el 90% de los casos se pueden usar ambas.

Hay algunas diferencias, algunas un poco más mundanas y otras mas complejas, vamos con las mundanas:

Si queremos hacer una unión de valores, interface no nos va a dejar, pero type si:
```ts
type Estado = "activo" | "inactivo" | "pendiente"; // ❌ imposible con interface
type ID = string | number;
type Coordenada = [number, number];
```

Ambas pueden extender de otros tipos, pero lo hacen con sintaxis diferente:
```ts
interface Animal {
  nombre: string;
}
interface Perro extends Animal {
  raza: string;
}

type Animal = { nombre: string };
type Perro = Animal & { raza: string }; // intersección en vez de extends
```

Mi recomendación es usar `type` para tipos simples y `interface` para objetos.

----------------
entonces, para ver si estoy entendiendo>

Los types, me definen, los tipos, que son como valores que me funcionaran para los objetos o interfaces.

Los objetos, me hacen objetos (los entiendo), pero puedo 
usar valores como los type, para que no se cuele otro dato que no quisiera.

Y los arrays, pues son arrarys (conozco), que deben cumplir con los 
objetos, y que a su vez deben cumplir con los types si es que hay
----------------