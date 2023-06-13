import {Component, OnInit} from '@angular/core';
import {Alumno} from "../../models/alumno";
import {AlumnoService} from "../../services/alumno.service";
import {ActivatedRoute, Router} from "@angular/router";


import Swal from 'sweetalert2'
import {CommonFormComponent} from "../common-form.component";


@Component({
    selector: 'app-alumnos-form',
    templateUrl: './alumnos-form.component.html',
    styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {

    constructor(
         service: AlumnoService,
         router: Router,
        //permite obtener parametros de la ruta
         route: ActivatedRoute
    ) {
        super(service, router, route);
        this.titulo = "Crear Alumnos";
        this.model = new Alumno();
        this.redirect = "/alumnos";
        this.nombreModelo = Alumno.name;
    }

}

