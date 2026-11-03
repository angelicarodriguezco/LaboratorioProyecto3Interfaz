import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit{
  private readonly productoService = inject(ProductoService);
  readonly authService = inject(AuthService);

  productos: Producto[] = [];
  error = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.productoService.findAll().subscribe({
      next: (data) => this.productos = data,
      error: () => this.error = 'No se pudieron cargar los productos'
    });
  }

  eliminar(id: number | null): void {
    if (id == null) return;
    if (!confirm('Eliminar este producto?')) return;

    this.productoService.delete(id).subscribe({
      next: () => this.cargar(),
      error: () => this.error = 'No se pudo eliminar'
    })
  }
}
