import {Pregunta} from "./pregunta";
import {Asignatura} from "./asignatura";
//deben ser iguales alos del bakent
export class Examen {
  id: number;
  nombre:string;
  createAt: string;
  preguntas: Pregunta[] = [];
  asignatura: Asignatura;
  respondido: boolean;
}
