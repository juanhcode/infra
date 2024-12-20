import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  logout(): void {
    // Eliminar los datos de autenticación del almacenamiento local
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('id_admin');
    localStorage.removeItem('token'); // Si tienes un token de autenticación

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/home-inicio-registro']);
  }

  isLoggedIn(): boolean {
    // Verificar si el usuario o el administrador está autenticado
    return localStorage.getItem('id_usuario') !== null || localStorage.getItem('id_admin') !== null;
  }

  isAdmin(): boolean {
    // Verificar si el administrador está autenticado
    return localStorage.getItem('id_admin') !== null;
  }

  isUser(): boolean {
    // Verificar si el usuario está autenticado
    return localStorage.getItem('id_usuario') !== null;
  }
}