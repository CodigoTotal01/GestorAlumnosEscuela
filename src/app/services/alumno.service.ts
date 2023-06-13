import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Alumno} from "../models/alumno";
// se puede inyectar en cualquier clase  o modulo
//registrado como proveido por eso no se requiere ser proveido en nungun modulo
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  // crear e inicializar atributo (forma larga)
  private baseEndPoint = 'http://localhost:8090/api/alumnos'


  private cabezera: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient) {}


  public listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.baseEndPoint);
    //definir a un objeto su esquema
    //   return this.http.get(this.baseEndPoint).pipe(
    //       map(alumnos => alumnos as Alumno[])
    //   )
  }

  //! Envio de parametros
  public listarPaginas (page: string, size: string): Observable<any>{
    //enviar parametros al endpint
    const params = new HttpParams() // es inmutable diurectamente se hace apenas se crea, porque si tomamos params creara instancias nuevas
        .set('page', page)
        .set('size', size);

    return this.http.get<any>(`${this.baseEndPoint}/pagina`, {params: params})
  }

  public ver(id: number): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.baseEndPoint}/${id}`);
  }

  //! definir y crear el contenido de la peticion (enlace, cuerpo, headers)
  public crear(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(this.baseEndPoint, alumno, {headers: this.cabezera});
  }

  public editar(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(`${this.baseEndPoint}/${alumno.id}`, alumno, {headers: this.cabezera});
  }
  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }



}
