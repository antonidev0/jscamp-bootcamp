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

----------------
entonces, para ver si estoy entendiendo>

Los types, me definen, los tipos, que son como valores que me funcionaran para los objetos o interfaces.

Los objetos, me hacen objetos (los entiendo), pero puedo 
usar valores como los type, para que no se cuele otro dato que no quisiera.

Y los arrays, pues son arrarys (conozco), que deben cumplir con los 
objetos, y que a su vez deben cumplir con los types si es que hay
----------------