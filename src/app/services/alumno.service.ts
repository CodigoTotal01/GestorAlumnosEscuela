import { Injectable } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
// se puede inyectar en cualquier clase  o modulo
//registrado como proveido por eso no se requiere ser proveido en nungun modulo
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  // crear e inicializar atributo (forma larga)
  private http: HttpClientModule

  private baseEndPoint = 'http://localhost:8090/api/alumnos'

  constructor(http: HttpClientModule) { this.http = http}
}
