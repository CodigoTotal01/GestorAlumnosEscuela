import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AlumnosComponent} from "./components/alumnos/alumnos.component";
import {CursosComponent} from "./components/cursos/cursos.component";
import {ExamenesComponent} from "./components/examenes/examenes.component";
import {AlumnosFormComponent} from "./components/alumnos/alumnos-form.component";
import {CursosFormComponent} from "./components/cursos/cursos-form.component";
import {ExamenFormComponent} from "./components/examenes/examen-form.component";

const routes: Routes = [
  {
    path: '', pathMatch:'full', redirectTo: 'cursos'
  },
  {
    path: 'alumnos',
    component: AlumnosComponent
  },
  {
    path: 'alumnos/form',
    component: AlumnosFormComponent
  },
  {
    // Cuando nos quieren pasar algo por el url
    path: 'alumnos/form/:id',
    component: AlumnosFormComponent
  },
  {
    path: 'cursos',
    component: CursosComponent
  },
  {
    path: 'cursos/form',
    component: CursosFormComponent
  },
  {
    path: 'cursos/form/:id',
    component: CursosFormComponent
  },
  {
    path: 'examenes',
    component: ExamenesComponent
  },
  {
    path: 'examenes/form',
    component: ExamenFormComponent
  },
  {
    path: 'examenes/form/:id',
    component: ExamenFormComponent
  }
];

@NgModule({
  // importar modulos
  imports: [
    RouterModule.forRoot(routes)
  ],

  //compartir con las demas carpetas mis modulos
  exports: [RouterModule]
})
export class AppRoutingModule { }
