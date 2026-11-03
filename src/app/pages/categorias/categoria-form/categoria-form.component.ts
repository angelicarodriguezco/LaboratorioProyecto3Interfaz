import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {
  private readonly categoriaService = inject(CategoriaService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  error = '';
  esEdicion = false;

  categoria: Categoria = {
    id: null,
    nombre: '',
    descripcion: ''
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.categoriaService.findById(Number(id)).subscribe({
        next: (data) => this.categoria = data,
        error: () => this.error = 'No se encontro la categoria'
      });
    }
  }

  onSubmit(): void {
    this.error = '';

    if (this.esEdicion && this.categoria.id != null) {
      this.categoriaService.update(this.categoria.id, this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: () => this.error = 'No se pudo actualizar'
      });
    } else {
      this.categoriaService.create(this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: () => this.error = 'No se pudo crear'
      });
    }
  }
}
