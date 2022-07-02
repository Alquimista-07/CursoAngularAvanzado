import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [

  // Documentación para saber las rutas y sus archivos
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRoutingModule
  {
    path: '**',
    component: NopagefoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
