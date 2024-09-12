import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(a => a.HomeComponent)
    },
    // {
    //     path: 'cameraman',
    //     loadComponent: () => import('./cameraman/cameraman.component').then(a => a.CameramanComponent)
    // },
    // {
    //     path: 'band',
    //     loadComponent: () => import('./band/band.component').then(a => a.BandComponent)
    // },
    // {
    //     path: 'photographer',
    //     loadComponent: () => import('./photographer/photographer.component').then(a => a.PhotographerComponent)
    // }
];
