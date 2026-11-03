import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductoListComponent } from './pages/productos/producto-list/producto-list.component';
import { UsuarioListComponent } from './pages/usuarios/usuario-list/usuario-list.component';
import { ProductoFormComponent } from './pages/productos/producto-form/producto-form.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

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
    path: 'productos/nuevo',
    component: ProductoFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'productos/:id/editar',
    component: ProductoFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'categorias',
    component: CategoriaListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'categorias/nuevo',
    component: CategoriaFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'categorias/:id/editar',
    component: CategoriaFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'usuarios',
    component: UsuarioListComponent,
    canActivate: [authGuard, adminGuard]
  },
  {path: '**', redirectTo: 'login'}
];
