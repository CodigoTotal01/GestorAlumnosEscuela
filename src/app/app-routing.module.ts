import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AlumnosComponent} from "./components/alumnos/alumnos.component";
import {CursosComponent} from "./components/cursos/cursos.component";
import {ExamenesComponent} from "./components/examenes/examenes.component";
import {AlumnosFormComponent} from "./components/alumnos/alumnos-form.component";

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
    path: 'examenes',
    component: ExamenesComponent
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
