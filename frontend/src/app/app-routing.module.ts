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
import { AdministradorComponent } from './administrador/administrador.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminVehiculosComponent } from './admin-vehiculos/admin-vehiculos.component';
import { AdminAgendamientosComponent } from './admin-agendamientos/admin-agendamientos.component';
import { AuthGuard } from './auth/auth.guard';
import { UserGuard } from './auth/user.guard'; // Importar el guard de usuario
import { AdminGuard } from './auth/admin.guard';

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
    canActivate: [AuthGuard, UserGuard], 
    children: [
      {
        path: "perfil-usuario",
        component: PerfilUsuarioComponent,
        canActivate: [AuthGuard, UserGuard] 
      },
      {
        path: "registrar-vehiculo",
        component: RegistrarVehiculoComponent,
        canActivate: [AuthGuard, UserGuard] 
      },
      {
        path: "agendar-cita",
        component: AgendarCitaComponent,
        canActivate: [AuthGuard, UserGuard] 
      }
    ]
  },
  {
    path: "administrador",
    component: AdministradorComponent,
    canActivate: [AuthGuard, AdminGuard], 
    children: [
      {
        path: "admin-vehiculos",
        component: AdminVehiculosComponent,
        canActivate: [AuthGuard, AdminGuard] 
      },
      {
        path: "admin-agendamientos",
        component: AdminAgendamientosComponent,
        canActivate: [AuthGuard, AdminGuard] 
      },
      {
        path: "admin-usuarios",
        component: AdminUsuariosComponent,
        canActivate: [AuthGuard, AdminGuard] 
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
