import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [ //para que fuera de este moldulo otro modulo lo pueda usar
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLinkWithHref,
    AppRoutingModule
  ]
})
export class LayoutModule { }
