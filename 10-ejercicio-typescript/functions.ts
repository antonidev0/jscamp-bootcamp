/* Aquí deberás usar los tipos creados en los ejercicios anteriores para definir los tipos de los parámetros y el valor de retorno de las funciones */
import type { Job } from './objects.ts';
import type { ExperienceLevel, Technology } from './types.ts';

// Funcion para filtrar por nivel de experiencia
export function filterByExperience(jobs: Job[], level: ExperienceLevel): Job[] {
  return jobs.filter((job) => job.experienceLevel === level)
}

// Funcion para filtrar por tecnologia
export function filterByTechnology(jobs: Job[], tech: Technology): Job[] {
  return jobs.filter((job) => job.technologies.includes(tech))
}

// Funcion para filtrar por salario minimo
export function filterByMinSalary(jobs: Job[], minSalary: number): Job[] {
  return jobs.filter((job) => job.salary !== undefined && job.salary >= minSalary)
}

// Funcion para buscar por texto
export function searchJobs(jobs: Job[], searchTerm: string): Job[] {
  const term = searchTerm.toLowerCase()
  return jobs.filter(
    (job) => job.title.toLowerCase().includes(term) || job.description.toLowerCase().includes(term)
  )
}
