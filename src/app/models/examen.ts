import {Pregunta} from "./pregunta";
import {Asignatura} from "./asignatura";
import {Generic} from "./generic";
//deben ser iguales alos del bakent
export class Examen implements Generic{
  id: number;
  nombre:string;
  createAt: string;
  preguntas: Pregunta[] = [];
  asignatura: Asignatura;
  respondido: boolean;
}
