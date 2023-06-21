import {Component, Inject, OnInit} from '@angular/core';
import {Curso} from "../../models/curso";
import {Alumno} from "../../models/alumno";
import {Examen} from "../../models/examen";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pregunta} from "../../models/pregunta";
import {Respuesta} from "../../models/respuesta";
import {ExamenesComponent} from "../examenes/examenes.component";

@Component({
  selector: 'app-responder-examenes-modal',
  templateUrl: './responder-examenes-modal.component.html',
  styleUrls: ['./responder-examenes-modal.component.css']
})
export class ResponderExamenesModalComponent implements OnInit {


  curso: Curso;
  alumno: Alumno;
  examen: Examen;


  respuestas: Map<number, Respuesta> = new  Map<number, Respuesta>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public modalRef: MatDialogRef<ResponderExamenesModalComponent>) { }

  ngOnInit(): void {
    this.curso = this.data.curso as Curso;
    this.alumno = this.data.alumno as Alumno;
    this.examen = this.data.examen as Examen;
  }

  cancelar() {
    this.modalRef.close();
  }

  responder(pregunta: Pregunta, event) {
    const texto = event.target.value as string;
    const respuesta = new Respuesta();
    respuesta.alumno = this.alumno;
    respuesta.pregunta = pregunta;
    const examen = new Examen();
    examen.id =this.examen.id;
    examen.nombre =this.examen.nombre;
    respuesta.pregunta.examen = examen;
    respuesta.texto = texto;

    // el id nos permitira editar esta pregunta exacta en el mapa
    this.respuestas.set(pregunta.id, respuesta)
    console.log(this.respuestas)

  }
}
