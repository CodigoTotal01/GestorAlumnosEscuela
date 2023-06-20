import Swal from 'sweetalert2';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Generic} from "../models/generic";
import {CommonService} from "../services/common.service";


import {Component, Inject, OnInit, ViewChild} from '@angular/core';

@Component({
    template: ''
})
export abstract class CommonListarComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

    public titulo: string;

    lista: E[] = [];

    protected nombreModel: string;


    totalRegistros: number = 0;
    totalPorPagina: number = 4;
    paginaActual: number = 0;
    pageSizeOptions: number[] = [3, 5, 10, 25, 100];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    //inyeccion de dependencias
    constructor(@Inject(CommonService<E>) protected service: S) {
        console.log(service)
    }

    ngOnInit(): void {
        this.calcularRangos();
    }


    //Eventos del componente

    //Actualiza pagina actual por cada interaccion
    paginar(event: PageEvent) {
        this.paginaActual = event.pageIndex;
        this.totalPorPagina = event.pageSize;
        this.calcularRangos();
    }


    private calcularRangos(): void {
        this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
            .subscribe(paginacion => {
                console.log(paginacion.content)
                //content es la lista paginada
                this.lista = paginacion.content as E[];
                this.totalRegistros = paginacion.totalElements as number;
                this.paginator._intl.itemsPerPageLabel = 'Registros por Pagina';
            });
    }


    eliminar(elemento: E): void {


        Swal.fire({
            title: `Seguro que desea elimianr a ${elemento.nombre}`,
            text: "No podra desaser esta accion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Quiero eliminarlo'
        }).then((result) => {

            if (result.isConfirmed) {
                this.service.eliminar(elemento.id).subscribe(() => {
                    // //filter es inmutable, la original se mantiene
                    // this.alumnos = this.alumnos.filter(alumnoRegistrado => alumnoRegistrado !== alumno);
                    this.calcularRangos();
                    Swal.fire("ELiminado", `${this.nombreModel} ${elemento.nombre} a sido eliminado de manera correcta`, "success");
                });
            }
        })
    }


}
