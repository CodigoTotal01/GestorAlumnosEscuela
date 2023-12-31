import {Component, OnInit, ViewChild} from '@angular/core';
import {Alumno} from "../../models/alumno";
import {Curso} from "../../models/curso";
import {Examen} from "../../models/examen";
import {ActivatedRoute} from "@angular/router";
import {AlumnoService} from "../../services/alumno.service";
import {CursoService} from "../../services/curso.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ResponderExamenesModalComponent} from "./responder-examenes-modal.component";
import {Respuesta} from "../../models/respuesta";
import {RespuestaService} from "../../services/respuesta.service";
import Swal from "sweetalert2";
import {VerExamenModalComponent} from "./ver-examen-modal/ver-examen-modal.component";

@Component({
    selector: 'app-responder-examen',
    templateUrl: './responder-examen.component.html',
    styleUrls: ['./responder-examen.component.css']
})
export class ResponderExamenComponent implements OnInit {

    alumno: Alumno;
    curso: Curso;
    examenes: Examen[] = [];
    mostrarColumnasExamenes= ['id', 'nombre', 'asignaturas', 'preguntas', 'responder', 'ver'];


    dataSource: MatTableDataSource<Examen>;

    //para usar el paginator en el oninit
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    pageSizeOptions = [3,5,10,20];


    constructor(private route: ActivatedRoute,
                private alumnoService: AlumnoService,
                private cursoService: CursoService,public dialog: MatDialog,
                private respuestaService: RespuestaService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          const id = +params.get('id');
          this.alumnoService.ver(id).subscribe(alumno => {
            this.alumno = alumno;
            this.cursoService.obtenerCursoPorAlumnoId(this.alumno).subscribe(
                curso => {
                    this.curso = curso;
                    this.examenes = (curso && curso.examenes)? curso.examenes : [];
                    this.dataSource = new MatTableDataSource<Examen>(this.examenes);
                    this.dataSource.paginator = this.paginator;
                    this.paginator._intl.itemsPerPageLabel = 'Registros por paginas'
                }
            );
          });
        });

    }

    responderExamen(examen: Examen) {
        //retorna la instancia de nuestra ventana modal
        const modalRef = this.dialog.open(ResponderExamenesModalComponent, {
            width: '750px',
            data: {curso: this.curso, alumno: this.alumno, examen: examen}
        });
        modalRef.afterClosed().subscribe((respuestasMap: Map<number, Respuesta>) => {
           console.log(respuestasMap);
           if(respuestasMap){
               //por lo general ses mejro crear nuvas instancias
               const respuestas = Array.from(respuestasMap.values());
               this.respuestaService.crear(respuestas).subscribe(respuesta => {
                   examen.respondido = true;
                   Swal.fire('Enviadas: ', 'Preguntas enviadas con exito', 'success')
                   console.log(respuesta)
               });
           }
        });
    }


    verExamen(examen):void {
        this.respuestaService.obtenerRespuestasPorAlumnoPorExamen(this.alumno, examen).subscribe(respuestas => {
            const modalRef = this.dialog.open(VerExamenModalComponent, {
                width: '750px',
                data: {
                    curso: this.curso,
                    examen: examen,
                    respuestas: respuestas
                }
            });
            modalRef.afterClosed().subscribe(()=> {
                console.log('Modal ver examen cerrado')

            })
        });
    }
}
