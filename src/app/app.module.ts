import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AlumnosComponent} from './components/alumnos/alumnos.component';
import {CursosComponent} from './components/cursos/cursos.component';
import {ExamenesComponent} from './components/examenes/examenes.component';
import {LayoutModule} from "./layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {AlumnosFormComponent} from './components/alumnos/alumnos-form.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Angular Material
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
    //componentes registrados dentro de este modulo
    declarations: [
        AppComponent,
        AlumnosComponent,
        CursosComponent,
        ExamenesComponent,
        AlumnosFormComponent
    ],
    //se importan todos los modulos
    imports: [
        BrowserModule,
        LayoutModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
