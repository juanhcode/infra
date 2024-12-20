import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-olvidar-formulario',
  templateUrl: './olvidar-formulario.component.html',
  styleUrl: './olvidar-formulario.component.css'
})

export class OlvidarFormularioComponent {

  mostrarFormulario = true;
  mostrarFormularioCodigo = false;
  email = '';
  codigo = '';
  newPassword = '';

  constructor(private http: HttpClient, public dialogRef?: MatDialogRef<OlvidarFormularioComponent>) {}
  
  enviarCodigo() {
    this.http.post('http://localhost:3000/send_code', { email: this.email }).subscribe(response => {
      console.log('Código enviado');
      this.mostrarFormulario = false;
      this.mostrarFormularioCodigo = true;
    });
  }

  verificarCodigo() {
    this.http.post('http://localhost:3000/verify-code', { email: this.email, code: this.codigo, newPassword: this.newPassword }).subscribe(response => {
      console.log('Contraseña actualizada');
      this.mostrarFormularioCodigo = false;
    });
  }
  

  onCancel(): void {
    this.dialogRef?.close(); 
  }

}
