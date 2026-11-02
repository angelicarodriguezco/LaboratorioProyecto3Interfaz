import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegistroRequest } from '../models/registro-request';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly apiUrl = environment.apiUrl;
    private readonly tokenKey = 'accessToken';

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, request).pipe(
            tap((response) => {
                localStorage.setItem(this.tokenKey, response.accessToken)
            })
        );
    }

    registrar(request: RegistroRequest): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/api/auth/registrar`, request);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getRoles(): string[] {
        const token = this.getToken();
        if (!token) {
            return [];
        }

        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
            const payload = JSON.parse(payloadJson);
            return payload.roles ?? [];
        } catch {
            return [];
        }
    }

    isAdmin(): boolean {
        return this.getRoles().indexOf('SUPER-ADMIN-ROLE') !== -1;
    }
}