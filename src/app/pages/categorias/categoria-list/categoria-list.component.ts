import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit {
  private readonly categoriaService = inject(CategoriaService);
  readonly authService = inject(AuthService);

  categorias: Categoria[] = [];
  error = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.categoriaService.findAll().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.error = 'No se pudieron cargar las categorias'
    });
  }

  eliminar(id: number | null): void {
    if (id == null) return;
    if (!confirm('Eliminar esta categoria?')) return;

    this.categoriaService.delete(id).subscribe({
      next: () => this.cargar(),
      error: () => this.error = 'No se pudo eliminar'
    });
  }
}
