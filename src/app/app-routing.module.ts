import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AutoresComponent } from './pages/autores/autores.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },

  { path: 'home', component: AutoresComponent },

  { path: 'favoritos', component: FavoritosComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
