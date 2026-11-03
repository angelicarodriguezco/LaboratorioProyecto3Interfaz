import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {
  private readonly usuarioService = inject(UsuarioService);

  usuarios: Usuario[] = [];
  error = '';

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe({
      next: (data) => this.usuarios = data,
      error: () => this.error = 'No se pudieron cargar los usuarios'
    })
  }
}
