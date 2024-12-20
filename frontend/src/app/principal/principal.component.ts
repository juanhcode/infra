import { Component, HostListener } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  sliderImages = [
    "/assets/images/carro1.jpg",
    "/assets/images/carro2.jpg",
    "/assets/images/carro3.jpg"
  ]

  sliderTexts = [
    "LAVADO Y DETALLADO DE AUTOMOVILES",
    "EQUIPO CON EXPERIENCIA PROFESIONAL",
    "MEJORES ACABADOS MEJORES PRODUCTOS"
  ];

  sliderTextsP = [
    "DALE DE NUEVO ESE LOOK A TU AUTO, EL TAMBIEN DEBE BRILLAR",
    "SOMOS EL MEJOR EQUIPO CALIFICADO, SIEMPRE BRINDANDO EL MEJOR SEVICIO",
    "NUESTROS PRODCUTOS SON DE ALTA CALIDAD"
  ];

  

  toInicio() {
    document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })
    document.getElementById("menu-movil")?.click();
  }
  toNosotros() {
    document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })
    document.getElementById("menu-movil")?.click();
  }
  toServicios() {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
    document.getElementById("menu-movil")?.click();
  }

  toContacto() {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
    document.getElementById("menu-movil")?.click();
  }

}


