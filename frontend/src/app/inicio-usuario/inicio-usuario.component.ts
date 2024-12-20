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

  constructor(
    private http: HttpClient,
    private router: Router, 
    public dialogRef?: MatDialogRef<InicioUsuarioComponent>    
  ) {}

    onSubmit(form: NgForm) {
      if (form.valid) {
        
        this.http.post('http://backend:3000/login', this.usuario)
        .subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            localStorage.setItem('id_usuario', this.usuario.id_usuario);
            alert('inicio de sesión exitoso');
            this.dialogRef?.close();  
            form.resetForm();
            this.router.navigate(['/sistema/perfil-usuario']);  
          },
          error => {
            console.error('Error al inciar sesion:', error);
            alert('Ocurrió un error al iniciar sesion el usuario');
          }
        );
      } else {
        console.log('Formulario inválido');
        alert('Por favor, completa todos los campos correctamente');
      }
    }

  onCancel(): void {
    this.dialogRef?.close(); 
  }

}
