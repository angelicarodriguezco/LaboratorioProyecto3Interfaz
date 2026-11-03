import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../../models/producto';
import { Categoria } from '../../../models/categoria';
import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';


@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit{
  private readonly productoService = inject(ProductoService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  categorias: Categoria[] = [];
  error = '';
  esEdicion = false;

  producto: Producto = {
    id: null,
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidadStock: 0,
    categoriaId: 0,
    categoriaNombre: null
  };

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.error = 'No se puedieron cargar categorias'
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.productoService.findById(Number(id)).subscribe({
        next: (data) => this.producto = data,
        error: () => this.error = 'No se encontro el producto'
      });
    }
  }

  onSubmit(): void {
    this.error = '';

    if (this.esEdicion && this.producto.id != null) {
      this.productoService.update(this.producto.id, this.producto).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: () => this.error = 'No se pudo actualizar'
      });
    } else {
      this.productoService.create(this.producto).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: () => this.error = 'No se pudo crear'
      });
    }
  }
}
