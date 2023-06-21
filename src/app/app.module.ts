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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

// Angular Material
import {MatPaginatorModule} from '@angular/material/paginator';
import { CursosFormComponent } from './components/cursos/cursos-form.component';
import { ExamenFormComponent } from './components/examenes/examen-form.component';
// ALumnos a cursos
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';
import {MatTabsModule} from "@angular/material/tabs";
// cursos a examenes
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsignarExamenesComponent } from './components/cursos/asignar-examenes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResponderExamenComponent } from './components/alumnos/responder-examen.component';
import { ResponderExamenesModalComponent } from './components/alumnos/responder-examenes-modal.component';
// responder examnes del curso, el ocmponente no se enrutara es solo un componente que se habre
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from '@angular/material/expansion';
import { VerExamenModalComponent } from './components/alumnos/ver-examen-modal/ver-examen-modal.component';

@NgModule({
    //componentes registrados dentro de este modulo
    declarations: [
        AppComponent,
        AlumnosComponent,
        CursosComponent,
        ExamenesComponent,
        AlumnosFormComponent,
        CursosFormComponent,
        ExamenFormComponent,
        AsignarAlumnosComponent,
        AsignarExamenesComponent,
        ResponderExamenComponent,
        ResponderExamenesModalComponent,
        VerExamenModalComponent,
    ],
    //para cosas en tiempo de ejecucion
    entryComponents: [ResponderExamenesModalComponent, VerExamenModalComponent],
    //se importan todos los modulos
    imports: [
        BrowserModule,
        LayoutModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatDialogModule,
        MatExpansionModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
