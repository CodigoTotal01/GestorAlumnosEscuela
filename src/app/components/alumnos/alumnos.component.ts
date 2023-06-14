import {Component, OnInit, ViewChild} from '@angular/core';
import {AlumnoService} from "../../services/alumno.service";
import {Alumno} from "../../models/alumno";

import {CommonListarComponent} from "../common-listar.component";
import {BASE_ENDPOINT} from "../../config/app";

@Component({
    selector: 'app-alumnos',
    templateUrl: './alumnos.component.html',
    styleUrls: ['./alumnos.component.css']
})
export
    class AlumnosComponent
    extends CommonListarComponent<Alumno, AlumnoService>
    implements OnInit {


    baseEndPoint: string = BASE_ENDPOINT + '/alumnos'

    protected override nombreModel: string  = Alumno.name;
    //cuanod se define ya no es necesario
    constructor(service: AlumnoService) {
        super(service);
        this.titulo = "Listado de Alumnos"
    }
}
