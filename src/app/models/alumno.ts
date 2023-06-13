//estas clases se mapean de los json
// ! significa que al atributo se le dara un valor mas adelante y no sera nulo
import {Generic} from "./generic";
//las interfaces son para definir un contrato
export class Alumno implements Generic{
  id: number;
  nombre:string;
  apellido: string;
  email:string;
  createAt: string;
  fotoHashCode: number;
}
