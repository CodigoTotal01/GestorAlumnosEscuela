import { Component, OnInit } from '@angular/core';
import {AlumnoService} from "../../services/alumno.service";
import {Alumno} from "../../models/alumno";

import Swal from 'sweetalert2'

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

  eliminar(alumno: Alumno):void {


    Swal.fire({
      title: '`Seguro que desea elimianr a ${alumno.nombre}`',
      text: "No podra desaser esta accion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Quiero eliminarlo'
    }).then((result) => {

      if (result.isConfirmed) {
        this.service.eliminar(alumno.id).subscribe(() => {
          //filter es inmutable, la original se mantiene
          this.alumnos = this.alumnos.filter(alumnoRegistrado => alumnoRegistrado !== alumno);
          Swal.fire("ELiminado", `Alumno ${alumno.nombre} a sido eliminado de manera correcta`,"success");
        });
      }
    })
  }
}
