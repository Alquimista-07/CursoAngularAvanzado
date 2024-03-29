import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        // Protegemos las rutas
        canActivate: [ AuthGuard ],
        children: [
          
          {
            path: '',
            component: DashboardComponent,
            // Para este tema del breadcrums podemos enviar la data la cual es un objeto que recibe argumentos como por ejemplo el titulo,
            // y demás información necesaria.
            data: {
              titulo: 'Dashboard'
            }
          },
          {
            path: 'progress',
            component: ProgressComponent,
            data: {
              titulo: 'ProgressBar'
            }
          },
          {
            path: 'grafica1',
            component: Grafica1Component,
            data: {
              titulo: 'Grafica #1'
            }
          },
          {
            path: 'account-settings',
            component: AccountSettingsComponent,
            data: {
              titulo: 'Ajustes de cuenta'
            }
          },
          {
            path: 'promesas',
            component: PromesasComponent,
            data: {
              titulo: 'Promesas'
            }
          },
          {
            path: 'rxjs',
            component: RxjsComponent,
            data: {
              titulo: 'Rxjs'
            }
          },
          {
            path: 'perfil',
            component: PerfilComponent,
            data: {
              titulo: 'Perfil de usuario'
            }
          }
    
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
