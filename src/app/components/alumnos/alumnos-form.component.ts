import {Component, OnInit} from '@angular/core';
import {Alumno} from "../../models/alumno";
import {AlumnoService} from "../../services/alumno.service";
import {ActivatedRoute, Router} from "@angular/router";


import Swal from 'sweetalert2'


@Component({
    selector: 'app-alumnos-form',
    templateUrl: './alumnos-form.component.html',
    styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {

    titulo = "Crear Alumnos"

    alumno: Alumno = new Alumno();

    error: any;

    constructor(
        private service: AlumnoService,
        private router: Router,
        //permite obtener parametros de la ruta
        private  route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id: number = +params.get('id'); //imporata mucho el nombre que le hallas dado en la ruta
            if(id){
                this.service.ver(id).subscribe(alumno => {
                    this.alumno = alumno;
                })
            }
        })
    }


    crear(): void {
        this.service.crear(this.alumno)
            .subscribe(
                {
                    next: (alumno: Alumno) => {
                        console.log(alumno);
                        Swal.fire("Nuevo", `Alumno ${alumno.nombre} craedo con exito`, "success");
                        this.router.navigate(['/alumnos']);
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

    editar():void {
        //recuerda que en este putno el alumno ya tiene el id mapeado
        this.service.editar(this.alumno)
            .subscribe(
                {
                    next: (alumno: Alumno) => {
                        console.log(alumno);
                        Swal.fire("Editar",`Alumno ${alumno.nombre} actualizado con exito`, "success");
                        this.router.navigate(['/alumnos']);
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
