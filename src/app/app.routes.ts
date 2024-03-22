import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

export const routes: Routes = [
    { path: '', redirectTo: 'heroes', pathMatch: 'full' },
    { path: 'heroes', component: HeroesComponent },
    { path: 'hero-detail', loadComponent: () => import('./hero-detail/hero-detail.component').then( m => m.HeroDetailComponent) },
    { path: 'hero-detail/:id', loadComponent: () => import('./hero-detail/hero-detail.component').then( m => m.HeroDetailComponent) },
    { path: '**', redirectTo: 'heroes'}
];
