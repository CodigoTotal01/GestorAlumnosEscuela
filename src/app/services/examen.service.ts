import {Injectable} from '@angular/core';
import {CommonService} from "./common.service";
import {Examen} from "../models/examen";
import {HttpClient} from "@angular/common/http";
import {BASE_ENDPOINT} from "../config/app";
import {Observable} from "rxjs";
import {Asignatura} from "../models/asignatura";

@Injectable({
    providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {
    //sobre escribir el contructor del padre
    constructor(http: HttpClient) {
        super(http);
        this.baseEndPoint = BASE_ENDPOINT + '/examenes';
    }

    //obtener lista completa de las asignaturas

    public findAllAsignatura(): Observable<Asignatura[]> {
        return this.http.get<Asignatura[]>(this.baseEndPoint + "/asignaturas");
    }

    public filtrarPorNombre(nombre: string): Observable<Examen[]>{
        return this.http.get<Examen[]>(`${this.baseEndPoint}/filtrar/${nombre}`)
    }
}
