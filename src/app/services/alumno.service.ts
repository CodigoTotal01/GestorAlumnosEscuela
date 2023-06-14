import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {Alumno} from "../models/alumno";
import {CommonService} from "./common.service";
import {BASE_ENDPOINT} from "../config/app";
// se puede inyectar en cualquier clase  o modulo
//registrado como proveido por eso no se requiere ser proveido en nungun modulo
@Injectable({
    providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {


    constructor(http: HttpClient) {
        super(http);
        this.baseEndPoint = BASE_ENDPOINT + '/alumnos'; // Asignar el valor directamente en el constructor
    }


    //enviar multipartfile
    public crearConFoto(alumno: Alumno, archivo: File): Observable<Alumno> {

        const formData: FormData = new FormData();
        formData.append('archivo', archivo);
        formData.append('nombre', alumno.nombre);
        formData.append('apellido', alumno.apellido);
        formData.append('email', alumno.email);

        //el form data se pasa, el formData queda por defecto en este tipo de contenido, por detras de esena se poblara
        return this.http.post<Alumno>(this.baseEndPoint + "/crear-con-foto", formData)
    }

    //enviar multipartfile
    public editarConFoto(alumno: Alumno, archivo: File): Observable<Alumno> {

        const formData: FormData = new FormData();
        formData.append('archivo', archivo);
        formData.append('nombre', alumno.nombre);
        formData.append('apellido', alumno.apellido);
        formData.append('email', alumno.email);

        return this.http.put<Alumno>(`${this.baseEndPoint}/editar-con-foto/${alumno.id}`, formData)
    }
}
