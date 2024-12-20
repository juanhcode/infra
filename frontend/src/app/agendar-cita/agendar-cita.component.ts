import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrl: './agendar-cita.component.css'
})
export class AgendarCitaComponent implements OnInit{
  servicios: any[] = [];
  placas: any[] = [];
  selectedServicios: number[] = [];
  selectedPlaca: string = '';
  selectedFecha: string = '';
  selectedHora: string = '';
  agendamientos: any[] = [];
 
  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cargarServicios();
    this.cargarPlacas();
    this.cargarAgendamientos();
  }
  
  cargarServicios(): void {
    this.http.get<any[]>('http://localhost:3000/get-servicios').subscribe(
      (data: any) => {
        this.servicios = data;
      },
      error => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  cargarAgendamientos(): void {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.http.get<any[]>(`http://localhost:3000/agendamientos/${id_usuario}`).subscribe(
        (data: any) => {
          this.agendamientos = data.agendamientos;
        },
        error => {
          console.error('Error al obtener los agendamientos:', error);
        }
      );
    }
  }

  cargarPlacas(): void {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.http.get<any[]>(`http://localhost:3000/placas/${id_usuario}`).subscribe(
        (data: any) => {
          this.placas = data.placas;
        },
        error => {
          console.error('Error al obtener las placas:', error);
        }
      );
    }
  }
  

  onServicioChange(event: any, servicioId: number): void {
    // Verificar si el servicioId es válido
    if (!servicioId) {
      console.error('Servicio ID inválido:', servicioId);
      return;
    }
  
    // Añadir o eliminar el servicio según el checkbox
    if (event.target.checked) {
      this.selectedServicios.push(servicioId);
    } else {
      this.selectedServicios = this.selectedServicios.filter(id => id !== servicioId);
    }
  
    console.log('Servicios seleccionados:', this.selectedServicios); // Para depuración
  }

  onSubmit(form: NgForm) {
    if (this.selectedServicios.length === 0) {
      alert('Debe seleccionar al menos un servicio.');
      return;
    }

    if (!this.selectedPlaca) {
      alert('Debe seleccionar una placa.');
      return;
    }

    if (!this.selectedFecha) {
      alert('Debe seleccionar una fecha.');
      return;
    }

    if (!this.selectedHora) {
      alert('Debe seleccionar una hora.');
      return;
    }
    const id_usuario = localStorage.getItem('id_usuario');
    const agendamiento = {
      id_usuario,
      placa: this.selectedPlaca,
      fecha_agendada: this.selectedFecha,
      hora_agendada: this.selectedHora,
      servicios_ids: this.selectedServicios
    };

    this.http.post('http://localhost:3000/add-agendamiento', agendamiento)
      .subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          alert('Cita agendada correctamente');
          this.cargarAgendamientos();
          form.resetForm();
          this.selectedServicios = [];
          this.selectedPlaca = '';
          this.selectedFecha = '';
          this.selectedHora = '';
        },
        error => {
          console.error('Error al agendar cita:', error);
          alert('Ocurrió un error al agendar la cita');
        }
      );
  }
}
