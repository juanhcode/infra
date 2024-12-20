import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  usuario = {
    id_usuario: '',
    nombre: '',
    email: '',
    password: '',
    telefono: '',
  };
  constructor(private http: HttpClient, private router: Router) {}


   ngOnInit() {
    this.cargarInformacionUsuario();
  }

  cargarInformacionUsuario(): void {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.http.get<any>(`http://localhost:3000/usuarios/${id_usuario}`).subscribe(
        (data) => {
          // Asignamos los datos recibidos a la variable `usuario`
          this.usuario = {
            id_usuario: data.id_usuario,
            nombre: data.nombre,
            email: data.email,
            password: data.password, // Deberías manejar esto con cuidado, por temas de seguridad
            telefono: data.telefono,
          };
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    } else {
      console.warn('No se encontró un ID de usuario en localStorage');
    }
  }

  actualizarPerfil(form: any) {
    if (form.valid) {
      // Realiza la solicitud PUT al servidor para actualizar los datos del usuario
      this.http.put('http://localhost:3000/update-user', this.usuario).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          alert('Información actualizada con éxito');
          this.router.navigate(['/perfil']); // Redirige a la página de perfil después de la actualización
        },
        (error) => {
          console.error('Error al actualizar la información del usuario:', error);
          alert('Error al actualizar la información. Por favor, intente nuevamente.');
        }
      );
    } else {
      console.error('El formulario no es válido.');
    }
  }
}
