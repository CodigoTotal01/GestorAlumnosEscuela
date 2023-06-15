import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import {Alumno} from "../models/alumno";
import {Curso} from "../models/curso";
import {HttpClient} from "@angular/common/http";
import {BASE_ENDPOINT} from "../config/app";


@Injectable({
  providedIn: 'root'
})
export class CursoService  extends CommonService<Curso>{

  //sobre escribir el contructor del padre
  constructor(http: HttpClient) {
    super(http);
    this.baseEndPoint = BASE_ENDPOINT + '/cursos';
  }

}
