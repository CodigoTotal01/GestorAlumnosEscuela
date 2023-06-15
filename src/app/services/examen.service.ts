import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import {Examen} from "../models/examen";
import {HttpClient} from "@angular/common/http";
import {BASE_ENDPOINT} from "../config/app";

@Injectable({
  providedIn: 'root'
})
export class ExamenService  extends CommonService<Examen>{
  //sobre escribir el contructor del padre
  constructor(http: HttpClient) {
    super(http);
    this.baseEndPoint = BASE_ENDPOINT + '/examenes';
  }}
