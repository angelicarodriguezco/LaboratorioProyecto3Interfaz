import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  error = '';

  onSubmit(): void {
    this.error = '';
    this.authService.registrar({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.error = 'No se pudo registrar. Intenta con otro usuario'
    });
  }
}
