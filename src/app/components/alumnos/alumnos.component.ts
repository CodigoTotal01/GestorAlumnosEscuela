import { Component, OnInit } from '@angular/core';
import {AlumnoService} from "../../services/alumno.service";
import {Alumno} from "../../models/alumno";

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  public titulo: string  = 'Listado de Alumnos';

  alumnos: Alumno[] = [];

  //inyeccion de dependencias
  constructor(private service: AlumnoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe((alumnos: Alumno[]) =>{
        this.alumnos = alumnos
    });
  }

}
