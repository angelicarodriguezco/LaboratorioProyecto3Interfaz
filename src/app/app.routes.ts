import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductoListComponent } from './pages/productos/producto-list/producto-list.component';
import { UsuarioListComponent } from './pages/usuarios/usuario-list/usuario-list.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: 'productos',
    component: ProductoListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'usuarios',
    component: UsuarioListComponent,
    canActivate: [authGuard, adminGuard]
  },
  {path: '**', redirectTo: 'login'}
];
