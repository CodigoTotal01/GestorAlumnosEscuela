import {Component, OnInit} from '@angular/core';
import {CommonFormComponent} from "../common-form.component";
import {Examen} from "../../models/examen";
import {ExamenService} from "../../services/examen.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-examen-form',
    templateUrl: './examen-form.component.html',
    styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent
    extends CommonFormComponent<Examen, ExamenService> implements OnInit {

    constructor(service: ExamenService,
                router: Router,
                route: ActivatedRoute) {
        super(service, router, route);
        this.titulo = "Crear Examen";
        this.model = new Examen();
        this.nombreModelo = Examen.name;
        this.redirect = "/examenes";
    }

}
