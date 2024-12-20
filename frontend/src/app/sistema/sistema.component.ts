import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Importar el servicio de autenticación

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent {

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}