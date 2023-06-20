import {Component, OnInit, ViewChild} from '@angular/core';
import {Curso} from "../../models/curso";
import {ActivatedRoute} from "@angular/router";
import {CursoService} from "../../services/curso.service";
import {AlumnoService} from "../../services/alumno.service";
import {Alumno} from "../../models/alumno";
import {SelectionModel} from "@angular/cdk/collections";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-asignar-alumnos',
    templateUrl: './asignar-alumnos.component.html',
    styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {

    curso: Curso;
    alumnosAsignar: Alumno[] = [];
    mostrarColumnas: string[] = ["nombre", "apellido", "seleccion"];
    mostrarColumnasAlumnos: string[] = ["id", "nombre", "apellido", "email", "eliminar"];

    //le permiticmos seleccion multiple
    seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);
    alumnos: Alumno[] = [];
    dataSource: MatTableDataSource<Alumno>;

    //paginator se inyecta en la vista
    @ViewChild(MatPaginator, {static: true})  paginator: MatPaginator;// apra que este disponble el cmapo en el on init, hacemos referencia al componente padre

    //selectect index ve4mos pa que es
    tabIndex: number = 0; // cooresponde al indice
    pageSizeOptions:number[] =  [3, 5, 10, 20, 50];

    constructor(private route: ActivatedRoute,
                private cursoService: CursoService, private alumnoService: AlumnoService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id: number = +params.get('id');
            this.cursoService.ver(id).subscribe(curso => {
                this.curso = curso;
                this.iniciarPaginador();
            });
        });
    }

    iniciarPaginador():void{
        //se necsitara actualisar la informacuion cuando se actualize, aniada, o elimine alguno de los alumnos
        this.alumnos = this.curso.alumnos;
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina'
    }

    filtrar(event: any) {
        let nombre = event.target.value;
        nombre = nombre !== undefined ? nombre.trim() : '';
        if (nombre !== '') {
            this.alumnoService.filtrarPorNombre(nombre).subscribe(alumno => {
                this.alumnosAsignar = alumno.filter(alumnoFiltrar => {
                    let filtrar: boolean = true;
                    this.alumnos.forEach(cursoAlumno => {
                        if (alumnoFiltrar.id === cursoAlumno.id) { // existe asi que no puede ir, lo chever eque filter acepta solo balores booleanos si este es true lo agregara
                            filtrar = false;
                        }
                    });
                    return filtrar

                });
            });
        }

    }


    estanTodosSeleccionados(): boolean {
        const seleccionados = this.seleccion.select.length;
        const numAlumnos = this.alumnosAsignar.length;

        return (seleccionados === numAlumnos);
    }

    seleccionarDesseleccionarTodos() {
        this.estanTodosSeleccionados();
        this.seleccion.clear();
        this.alumnosAsignar.forEach(alumno => this.seleccion.select(alumno));
    }


    asignar(): void {
        this.cursoService.asignarAlumnos(this.curso, this.seleccion.selected)
            .subscribe(
                {
                    next: curso => {
                        this.tabIndex = 2;
                        Swal.fire("Agregado", "Los estudiantes fueron asignados con exito", "success");
                        //se supone uqe nos ahora costes de carga, por lo que entiendo pondra los los objetos de alumnos
                        // que tengamos en la lista de alumnos asi no hara falta realziar otra peticion
                        this.alumnos = this.alumnos.concat(this.seleccion.selected);
                        this.iniciarPaginador();
                        this.alumnosAsignar = [];
                        this.seleccion.clear();
                    },
                    error: e => {
                        if (e.status === 500) {
                            const mensaje: string = e.error.message as string;
                            if (mensaje.indexOf('ConstrainViolationException') > -1) {
                                Swal.fire("Cuidado:", "No se puede asignar al alumno ya que esta asociado a otro curso", 'error');
                            }
                            Swal.fire("Cuidado:", "No se puede colocar a un alumno previamente registrado", 'error');

                        }
                    }
                }
            )
        ;
    }

    eliminarAlumno(alumno: Alumno): void {


        Swal.fire({
            title: `Seguro que desea elimianr a ${alumno.nombre}`,
            text: "No podra desaser esta accion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Quiero eliminarlo'
        }).then((result) => {

            if (result.isConfirmed) {
                this.cursoService.eliminarAlumno(this.curso, alumno).subscribe(curso => {
                    //Actualizar la lista de alumnos mapeada - oninit
                    this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
                    this.iniciarPaginador();

                    Swal.fire("Eliminado:", `Alumno ${alumno.nombre} eliminado con exito del curso ${curso.nombre}`,
                        "error")
                });
            }
        })




    }
}
