import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-agendamientos',
  templateUrl: './admin-agendamientos.component.html',
  styleUrls: ['./admin-agendamientos.component.css']
})
export class AdminAgendamientosComponent implements OnInit {
  agendamientos: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarAgendamientos();
  }

  cargarAgendamientos(): void {
    this.http.get<any>('http://localhost:3000/userAgenda').subscribe(
      (data: any) => {
        this.agendamientos = data.agendamientos;
      },
      error => {
        console.error('Error al obtener los agendamientos:', error);
      }
    );
  }
}