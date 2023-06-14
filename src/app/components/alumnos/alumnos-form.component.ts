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

    private fotoSeleccionada: File;


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

    //multipart
    seleccionarFoto(event: any):void {
        //solo es un una foto
        this.fotoSeleccionada = event.target.files[0];
        //preguntamos si conteine una de las palabras si es negativo quiere decir que no es una imagen
        if(this.fotoSeleccionada.type.indexOf('image')){
            this.fotoSeleccionada = null;
            Swal.fire("Error al selecciona la imagen:", "El Archivo debe ser de tipo imagen", "error")
        }
    }

    public  override crear():void{
        if(!this.fotoSeleccionada){
            super.crear();
        }else{
            this.service.crearConFoto(this.model, this.fotoSeleccionada)
                .subscribe(
                    {
                        next: (alumno: Alumno) => {
                            console.log(alumno);
                            Swal.fire("Nuevo", `${this.nombreModelo} ${alumno.nombre} craedo con exito`, "success");
                            this.router.navigate([`/${this.redirect}`]);
                        },
                        error: (error) => {
                            if (error.status === 400) {
                                this.error = error.error;
                                console.log(this.error)
                            }
                        }
                    }
                );
        }
    }


    public override editar():void{
        if(!this.fotoSeleccionada){
            super.editar();
        }else{
            this.service.editarConFoto(this.model, this.fotoSeleccionada)
                .subscribe(
                    {
                        next: (alumno: Alumno) => {
                            console.log(alumno);
                            Swal.fire("Modificado", `${this.nombreModelo} ${alumno.nombre} actualizado con exito`, "success");
                            this.router.navigate([`/${this.redirect}`]);
                        },
                        error: (error) => {
                            if (error.status === 400) {
                                this.error = error.error;
                                console.log(this.error)
                            }
                        }
                    }
                );
        }
    }
}

