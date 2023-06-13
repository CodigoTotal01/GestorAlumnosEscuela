import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import {Alumno} from "../models/alumno";
import {Curso} from "../models/curso";

@Injectable({
  providedIn: 'root'
})
export class CursoService  extends CommonService<Curso>{

  protected override baseEndPoint = 'http://localhost:8090/api/cursos'

}
