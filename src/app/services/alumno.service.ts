import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Alumno} from "../models/alumno";
import {CommonService} from "./common.service";
// se puede inyectar en cualquier clase  o modulo
//registrado como proveido por eso no se requiere ser proveido en nungun modulo
@Injectable({
    providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {
    constructor(http: HttpClient) {
        super(http);
        this.baseEndPoint = 'http://localhost:8090/api/alumnos'; // Asignar el valor directamente en el constructor
    }
}
