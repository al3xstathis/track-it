import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./loading/loading.module').then(m => m.LoadingPageModule)
    },
    {
        path: 'decathlon',
        loadChildren: () => import('./decathlon/decathlon.module').then(m => m.DecathlonPageModule)
    },
    {
        path: 'heptathlon',
        loadChildren: () => import('./heptathlon/heptathlon.module').then(m => m.HeptathlonPageModule)
    },
    {
        path: 'm-heptathlon',
        loadChildren: () => import('./m-heptathlon/m-heptathlon.module').then(m => m.MHeptathlonPageModule)
    },
    {
        path: 'f-pentathlon',
        loadChildren: () => import('./f-pentathlon/f-pentathlon.module').then(m => m.FPentathlonPageModule)
    },
    {
        path: 'runways',
        loadChildren: () => import('./runways/runways.module').then(m => m.RunwaysPageModule)
    },
    {
        path: 'saved',
        loadChildren: () => import('./saved/saved.module').then(m => m.SavedPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'unit-converter',
        loadChildren: () => import('./unit-converter/unit-converter.module').then(m => m.UnitConverterPageModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
