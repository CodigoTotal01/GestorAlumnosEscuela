import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

export abstract class CommonService<E extends Generic> {

  protected baseEndPoint: string;

  protected cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) { }


  public listar(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndPoint);
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

  public ver(id: number): Observable<E>{
    return this.http.get<E>(`${this.baseEndPoint}/${id}`);
  }

  //! definir y crear el contenido de la peticion (enlace, cuerpo, headers)
  public crear(common: E): Observable<E>{
    return this.http.post<E>(this.baseEndPoint, common, {headers: this.cabeceras});
  }

  public editar(common: E): Observable<E>{
    return this.http.put<E>(`${this.baseEndPoint}/${common.id}`, common, {headers: this.cabeceras});
  }
  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }



}
