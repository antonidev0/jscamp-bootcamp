/* Aquí deberás definir los tipos para los objetos Job, Company y Candidate */
 
import type { ExperienceLevel, WorkMode, Technology } from './types.ts'

export Job = {
    id: string;
    title: string;
    description: string;
    company: Company;
    location: string;
    salary?: number;
    experienceLevel: ExperienceLevel;
}
export type Company = 
export type Candidate =  
