import {Component, OnInit} from '@angular/core';
import {CommonFormComponent} from "../common-form.component";
import {Examen} from "../../models/examen";
import {ExamenService} from "../../services/examen.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Asignatura} from "../../models/asignatura";
import {Pregunta} from "../../models/pregunta";
import Swal from "sweetalert2";

@Component({
    selector: 'app-examen-form',
    templateUrl: './examen-form.component.html',
    styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent
    extends CommonFormComponent<Examen, ExamenService>
    implements OnInit {

    asignaturasPadre: Asignatura[] = [];

    asignaturasHija: Asignatura[] = [];


    errorPreguntas: string;

    constructor(service: ExamenService,
                router: Router,
                route: ActivatedRoute) {
        super(service, router, route);
        this.titulo = "Crear Examen";
        this.model = new Examen();
        this.nombreModelo = Examen.name;
        this.redirect = "/examenes";
    }

    override ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id: number = +params.get('id'); //imporata mucho el nombre que le hallas dado en la ruta
            if (id) {
                this.service.ver(id).subscribe(modelo => {
                    this.model = modelo;
                    this.titulo = "Editar " + this.nombreModelo;

                    // //llenar con als asignaturas hijas
                    // this.service.findAllAsignatura().subscribe(asignatura => {
                    //
                    //     this.asignaturasHija = asignatura.filter(asignaturaPadre => {
                    //
                    //         return asignaturaPadre.padre && asignaturaPadre.padre.id === this.model.asignaturaPadre.id
                    //     })
                    //
                    // });
                    this.cargarHijos();
                })
            }
        })

        this.service.findAllAsignatura().subscribe(asignaturas => {
            //trae padres e hijos
            this.asignaturasPadre = asignaturas.filter(a => !a.padre);
        })
    }


    override   crear(): void {
        if(this.model.preguntas.length === 0 ){
            Swal.fire("Error Preguntas", "Examen debe tenre preguntas", "error")
            return;
        }

        this.eliminarPreguntasVacias();
        super.crear();
    }


    override editar(): void {

        if(this.model.preguntas.length === 0 ){
            Swal.fire("Error Preguntas", "Examen debe tenre preguntas", "error")
            return;
        }
        this.eliminarPreguntasVacias();

        super.editar();
    }
    cargarHijos() {
        this.asignaturasHija = this.model.asignaturaPadre ? this.model.asignaturaPadre.hijos : [];
    }

    compararAsignatura(asignatura1: Asignatura, asignatura2: Asignatura): boolean {
        if (asignatura1 === undefined && asignatura2 === undefined) {
            return true;
        }

        // PAra no mostrar error en consula
        if (asignatura1 === null || asignatura2 === null || asignatura1 === undefined || asignatura2 === undefined) {
            return false;
        }

        //como es asincrono puede uqe los datos no se cargen rapidisimo, ahay un lapto de tiempo que son indefiniddos
        if (asignatura1.id === asignatura2.id) {
            return true;
        }

        return (asignatura1 === null || asignatura2 === null || asignatura1 === undefined || asignatura2 === undefined) ? false : asignatura1.id === asignatura2.id;
    }


    //como es reactivo generara el campo, porque hay un componente de angular que itera sobre las preguntas del examen
    agregarPregunta() {
        this.model.preguntas.push(new Pregunta());
    }

    asignarTexto(pregunta: Pregunta, event: any) {
        pregunta.texto = event.target.value as string;
    }

    eliminarPregunta(pregunta: Pregunta) {
        this.model.preguntas = this.model.preguntas.filter(preguntaRegistrada => pregunta.texto !== preguntaRegistrada.texto);
    }

    eliminarPreguntasVacias(): void{
        this.model.preguntas = this.model.preguntas.filter(preguntaRegistrada => preguntaRegistrada.texto != null && preguntaRegistrada.texto.length > 0 );
    }
}
