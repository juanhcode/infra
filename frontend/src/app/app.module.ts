import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { HomeInicioComponent } from './home-inicio/home-inicio.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from '@angular/material/dialog';
import { PrincipalComponent } from './principal/principal.component';
import { OlvidarFormularioComponent } from './olvidar-formulario/olvidar-formulario.component';
import { SistemaComponent } from './sistema/sistema.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    InicioUsuarioComponent,
    HomeInicioComponent,
    PrincipalComponent,
    OlvidarFormularioComponent,
    SistemaComponent,
    PerfilUsuarioComponent,
    RegistrarVehiculoComponent,
    AgendarCitaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  exports: [
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
