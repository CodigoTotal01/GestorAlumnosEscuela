import {Component, OnInit, ViewChild} from '@angular/core';
import {Curso} from "../../models/curso";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CursoService} from "../../services/curso.service";
import {ExamenService} from "../../services/examen.service";
import {FormControl} from "@angular/forms";
import {Examen} from "../../models/examen";
import {map, mergeMap} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import Swal from "sweetalert2";
import {Alumno} from "../../models/alumno";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-asignar-examenes',
    templateUrl: './asignar-examenes.component.html',
    styleUrls: ['./asignar-examenes.component.css']
})
export class AsignarExamenesComponent implements OnInit {

    curso: Curso;
    autocompleteControl = new FormControl();

    examenesFiltrados: Examen[] = [];
    examenes: Examen[] = [];
    examenesAsignar: Examen[] = [];

    mostrarColumnas = ['nombre', 'asignatura', 'eliminar'];
    mostrarColumnasExamenes = ['id', 'nombre', 'asignatura','eliminar'];


    dataSource: MatTableDataSource<Examen>;

    //importar de la plantilla
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


    pageSizeOptions = [3, 5, 10, 20, 50];

    //para cambiar entre tablas
    tabIndex: number = 0;

    constructor(private route: ActivatedRoute,
                private router: Router, //obtener informacion de los parametros del url
                private cursoService: CursoService,
                private examenService: ExamenService) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id: number = +params.get('id');
            //mapear conteneido de curso a nuestro objeto
            this.cursoService.ver(id).subscribe(curso => {
                this.curso = curso;
                this.examenes = this.curso.examenes;
                this.iniciarPaginador();
            });
        });

        this.autocompleteControl.valueChanges.pipe(
            map(valor => typeof valor === 'string' ? valor : valor.nombre),
            //para retornar otro flujo reactivo
            mergeMap(valor => valor ? this.examenService.filtrarPorNombre(valor) : [])
        ).subscribe(examenes => this.examenesFiltrados = examenes);
    }

    // Prodria no venir un examen

    mostrarNombre(examen?: Examen): string {
        return examen ? examen.nombre : '';
    };


    private iniciarPaginador(){
        this.dataSource = new MatTableDataSource<Examen>(this.examenes);
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Registros por Pagina'

    }


    seleccionarExamen(event: MatAutocompleteSelectedEvent) {
        const examen: Examen = event.option.value as Examen;
        //concat amantiene la informacion del arreglo aterior, util porque antes no actulizava la informacion
        if (!this.existe(examen.id)) {
            this.examenesAsignar = this.examenesAsignar.concat(examen);
            console.log(this.examenesAsignar);
            this.limpiarInput(event);
        } else {
            Swal.fire(
                'Error',
                `El examen ${examen.nombre} ya esta asignado al curso`,
                'error'
            )
        }
    }

    limpiarInput(event: MatAutocompleteSelectedEvent): void {
        this.autocompleteControl.setValue('');
        event.option.deselect();
        event.option.focus();
    }

    private existe(id: number): boolean {
        let existe = false;
        // convinar los arrelgos de la tabla y los examenes del curso , el tema de inmutabilidad
        this.examenesAsignar.concat(this.examenes).forEach(examenRegistrado => {
            if (id === examenRegistrado.id) {
                existe = true;
            }
        });
        return existe
    }

    eliminarDelAsignar(examen: Examen): void {
        this.examenesAsignar = this.examenesAsignar.filter(examenAsignado => {
            return examen.id !== examenAsignado.id;
        })
    }

    //ta chevere pero cuando se envia, pero lo manolo es que se podra segir asignando mas veces eso ta mal

    asignar() {
        console.log(this.examenesAsignar)
        this.cursoService.asignarExamenes(this.curso, this.examenesAsignar).subscribe(curso => {
            //actualizar la lista
            this.examenes = this.examenes.concat(this.examenesAsignar);
            this.iniciarPaginador();
            this.examenesAsignar = [];


            Swal.fire("Asignado:",
                `En el curso: ${this.curso.nombre} se asigno los examenes seleccionados`,
                'success')
            this.tabIndex = 2;
        });
    }

    eliminarExamen(examen: Examen): void {


        Swal.fire({
            title: `Seguro que desea elimianr a ${examen.nombre}`,
            text: "No podra desaser esta accion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Quiero eliminarlo'
        }).then((result) => {

            if (result.isConfirmed) {
                this.cursoService.eliminarExamen(this.curso, examen).subscribe(curso => {
                    //Actualizar la lista de examens
                    this.examenes = this.examenes.filter(a => a.id !== examen.id);
                    this.iniciarPaginador();

                    Swal.fire("Eliminado:", `Examen ${examen.nombre} eliminado con exito del curso ${curso.nombre}`,
                        "error")
                });
            }
        })
    }
}
