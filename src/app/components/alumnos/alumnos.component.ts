import {Component, OnInit, ViewChild} from '@angular/core';
import {AlumnoService} from "../../services/alumno.service";
import {Alumno} from "../../models/alumno";

import {CommonListarComponent} from "../common-listar.component";

@Component({
    selector: 'app-alumnos',
    templateUrl: './alumnos.component.html',
    styleUrls: ['./alumnos.component.css']
})
export
    class AlumnosComponent
    extends CommonListarComponent<Alumno, AlumnoService>
    implements OnInit {


    protected override nombreModel: string  = Alumno.name;
    //cuanod se define ya no es necesario
    constructor(service: AlumnoService) {
        super(service);
        this.titulo = "Listado de Alumnos"
    }
}
