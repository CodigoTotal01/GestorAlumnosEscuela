import {Component, OnInit, ViewChild} from '@angular/core';
import {Alumno} from "../../models/alumno";
import {Curso} from "../../models/curso";
import {Examen} from "../../models/examen";
import {ActivatedRoute} from "@angular/router";
import {AlumnoService} from "../../services/alumno.service";
import {CursoService} from "../../services/curso.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

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
                private cursoService: CursoService) {
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

}
