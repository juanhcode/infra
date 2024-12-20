import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css']
})
export class RegistrarVehiculoComponent implements OnInit {
  vehiculos: any[] = [];
  vehiculo = {
    marca: '',
    modelo: '',
    color: '',
    placa: ''
  };
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.http.get<any[]>(`http://localhost:3000/vehicles/${id_usuario}`).subscribe(
        (data:any) => {
          this.vehiculos = data.vehicles;
        },
        error => {
          console.error('Error al obtener los vehículos:', error);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const id_usuario = localStorage.getItem('id_usuario');
      const vehiculo = { id_usuario, ...form.value };
      this.http.post('http://localhost:3000/add-vehicle', vehiculo)
        .subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            alert('Vehículo registrado correctamente');
            this.cargarVehiculos();
            form.resetForm();
            
            this.errorMessage = null;
          },
          error => {
            
            this.errorMessage = 'Ocurrió un error al registrar el vehículo';
            alert('Este vehiculo ya se encuentra registrado');
          }
        );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
    }
  }

  eliminarVehiculo(placa: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      this.http.delete('http://localhost:3000/delete-vehicle', { body: { placa } })
        .subscribe(
          response => {
            console.log('Vehículo eliminado:', response);
            alert('Vehículo eliminado correctamente');
            this.cargarVehiculos();
          },
          error => {
            console.error('Error al eliminar vehículo:', error);
            this.errorMessage = 'Ocurrió un error al eliminar el vehículo';
          }
        );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      console.log('Formulario:', form.value);
      const vehiculo = { ...form.value };
      this.http.put('http://localhost:3000/update-vehicle', vehiculo)
        .subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            alert('Vehículo editado correctamente');
            this.cargarVehiculos();
            form.resetForm();
            
            this.errorMessage = null;
          },
          error => {
            console.log('Entro');
            console.error('Error al registrar vehículo:', error);
            this.errorMessage = 'Ocurrió un error al registrar el vehículo';
          }
        );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
    }
  }

  

}