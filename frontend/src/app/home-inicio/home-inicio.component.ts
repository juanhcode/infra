import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { InicioUsuarioComponent } from '../inicio-usuario/inicio-usuario.component';
import { OlvidarFormularioComponent } from '../olvidar-formulario/olvidar-formulario.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-inicio',
  templateUrl: './home-inicio.component.html',
  styleUrl: './home-inicio.component.css'
})
export class HomeInicioComponent {

  mostrarFormulario = false;
  mostrarFormularioCodigo = false;
  email = '';
  codigo = '';
  newPassword = '';

  

  constructor(public dialog: MatDialog, private http: HttpClient) {}

  mostrarFormularioOlvidar() {
    this.mostrarFormulario = true;
  }

  enviarCodigo() {
    this.http.post('/send-code', { email: this.email }).subscribe(response => {
      console.log('Código enviado');
      this.mostrarFormulario = false;
      this.mostrarFormularioCodigo = true;
    });
  }

  verificarCodigo() {
    this.http.post('/verify-code', { email: this.email, code: this.codigo, newPassword: this.newPassword }).subscribe(response => {
      console.log('Contraseña actualizada');
      this.mostrarFormularioCodigo = false;
    });
  }

  // Método para abrir el modal
  registrarUsuario(): void {
    const dialogRef = this.dialog.open(RegistroUsuarioComponent, {
      width: '600px',  // Puedes ajustar el tamaño de la ventana modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  iniciarUsuario(): void {
    const dialogRef = this.dialog.open(InicioUsuarioComponent, {
      width: '600px',  // Puedes ajustar el tamaño de la ventana modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  formularioOlvidar(): void {
    const dialogRef = this.dialog.open(OlvidarFormularioComponent, {
      width: '600px',  // Puedes ajustar el tamaño de la ventana modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

}
