import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'heroes', pathMatch: 'full' },
    { path: 'heroes', loadComponent: () => import('./views/heroes/heroes.component').then( m => m.HeroesComponent) },
    { path: 'hero-detail/:id', loadComponent: () => import('./views/hero-detail/hero-detail.component').then( m => m.HeroDetailComponent) },
    { path: '**', redirectTo: 'heroes'}
];
