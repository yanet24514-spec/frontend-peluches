import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  listaPeluches: any[] = [];

  constructor() {
    this.buscarPeluches('bear');
  }

  async buscarPeluches(termino: string) {
    Swal.fire({
      title: 'Cargando Peluches...',
      text: 'Consultando servicio desde Angular',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${termino || 'bear'}`);
      const data = await res.json();
      Swal.close();

      this.listaPeluches = data.products.slice(0, 6);

      Swal.fire({
        icon: 'success',
        title: '¡Peluches Encontrados!',
        text: `Se cargaron ${this.listaPeluches.length} elementos correctamente.`,
        timer: 1800,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo conectar con el servicio.' });
    }
  }

  agregarFavorito(nombre: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Añadido a Favoritos!',
      text: `El peluche "${nombre}" se agregó correctamente.`,
      confirmButtonColor: '#dc3545'
    });
  }
}