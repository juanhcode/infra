import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HomeInicioComponent } from './home-inicio/home-inicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { SistemaComponent } from './sistema/sistema.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';

const routes: Routes = [
  {
    path: "",
    component: PrincipalComponent
  },
  {
    path: "home-inicio-registro",
    component: HomeInicioComponent
  },
  {
    path: "inicio-usuario",
    component: InicioUsuarioComponent
  },
  {
    path: "registro-usuario",
    component: RegistroUsuarioComponent
  },
  {
    path: "sistema",
    component: SistemaComponent,
    children: [
      {
        path: "perfil-usuario",
        component: PerfilUsuarioComponent
      },
      {
        path: "registrar-vehiculo",
        component: RegistrarVehiculoComponent
      },
      {
        path: "agendar-cita",
        component: AgendarCitaComponent
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
