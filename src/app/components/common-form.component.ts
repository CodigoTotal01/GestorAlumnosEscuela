import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


import Swal from 'sweetalert2'
import {CommonService} from "../services/common.service";
import {Generic} from "../models/generic";

@Component({
    template: ''
})
export class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

    titulo: string;
//no se puede indstanciar un atributo generico
    model: E;
    error: any;
    protected redirect: string;
    protected nombreModelo: string;

    constructor(
        @Inject(CommonService<E>)  protected service: S,
        protected router: Router,
        //permite obtener parametros de la ruta
        protected route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id: number = +params.get('id'); //imporata mucho el nombre que le hallas dado en la ruta
            if (id) {
                this.service.ver(id).subscribe(modelo => {
                    this.model = modelo;
                })
            }
        })
    }


    crear(): void {
        this.service.crear(this.model)
            .subscribe(
                {
                    next: (m: E) => {
                        console.log(m);
                        Swal.fire("Nuevo", `${this.nombreModelo} ${m.nombre} craedo con exito`, "success");
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

    editar(): void {
        //recuerda que en este putno el alumno ya tiene el id mapeado
        this.service.editar(this.model)
            .subscribe(
                {
                    next: (m: E) => {
                        console.log(m);
                        Swal.fire("Editar", `${this.nombreModelo} ${m.nombre} actualizado con exito`, "success");
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
