import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Respuesta} from "../models/respuesta";
import {Observable} from "rxjs";
import {BASE_ENDPOINT} from "../config/app";
import {Alumno} from "../models/alumno";
import {Examen} from "../models/examen";

@Injectable({
    providedIn: 'root'
})
export class RespuestaService {
    private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    private  baseEndPoint = BASE_ENDPOINT + '/respuestas';


//inyeccion de servicio
    constructor(private http: HttpClient) {
    }



    crear(respestas: Respuesta[]): Observable<Respuesta[]> {
        return this.http.post<Respuesta[]>(this.baseEndPoint, respestas, {headers: this.cabeceras});
    }

    obtenerRespuestasPorAlumnoPorExamen(alumno: Alumno, examen: Examen): Observable<Respuesta[]>{
        return  this.http.get<Respuesta[]>(`${this.baseEndPoint}/alumno/${alumno.id}/examen/${examen.id}`);
    }

}
