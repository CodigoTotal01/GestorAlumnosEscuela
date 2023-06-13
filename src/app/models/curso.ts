import {Alumno} from "./alumno";
import {Examen} from "./examen";

export class Curso {
  id: number;
  nombre:string;
  createAt: string;
  alumnos: Alumno[] = []; // inicializar siempre el valor para que no sea null
  examenes: Examen[] = [];
}
