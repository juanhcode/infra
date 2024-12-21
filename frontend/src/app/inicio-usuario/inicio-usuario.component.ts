import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrl: './inicio-usuario.component.css'
})
export class InicioUsuarioComponent {
  usuario = {
    id_usuario: '',
    password: '',
  };

  admin = {
    id_admin: '',
    password: '',
  };

  isAdminLogin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialogRef?: MatDialogRef<InicioUsuarioComponent>
  ) { }

  toggleLogin(): void {
    this.isAdminLogin = !this.isAdminLogin;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isAdminLogin) {
        // Login de administrador
        this.http.post('http://localhost:3000/admin-login', this.admin)
          .subscribe(
            response => {
              console.log('Respuesta del servidor:', response);
              localStorage.setItem('id_admin', this.admin.id_admin);
              alert('Inicio de sesión de administrador exitoso');
              this.dialogRef?.close();
              form.resetForm();
              this.router.navigate(['/administrador/admin-vehiculos']); // Redirigir a la página de administrador
            },
            error => {
              console.error('Error al iniciar sesión de administrador:', error);
              alert('Ocurrió un error al iniciar sesión de administrador');
            }
          );
      } else {
        // Login de usuario
        this.http.post('http://localhost:3000/login', this.usuario)
          .subscribe(
            response => {
              console.log('Respuesta del servidor:', response);
              localStorage.setItem('id_usuario', this.usuario.id_usuario);
              alert('Inicio de sesión exitoso');
              this.dialogRef?.close();
              form.resetForm();
              this.router.navigate(['/sistema/perfil-usuario']); // Redirigir a la página de perfil de usuario
            },
            error => {
              console.error('Error al iniciar sesión:', error);
              alert('Ocurrió un error al iniciar sesión');
            }
          );
      }
    } else {
      console.log('Formulario inválido');
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  onCancel(): void {
    this.dialogRef?.close();
  }

}
