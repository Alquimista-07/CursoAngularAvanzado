import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';

import { InicioComponent } from './pages/inicio/inicio.component';
import { GotyComponent } from './pages/goty/goty.component';

// ---------------------------------------------------------------------------------------------------------------------------
// NOTAS IMPORTANTES SOBRE: Angularfire - Obtener información en tiempo real
// ---------------------------------------------------------------------------------------------------------------------------
// NOTA 1: Para agregar Angularfire que básicamente nos sirve para obtener la información en tiempo real podemos 
//        diregirnos a los siguientes enlaces, los cuales contienen la documentación oficial de como instalar y 
//        configurar un proyecto para poderlo usar:
// 
//        Enlace documentación: https://github.com/angular/angularfire
//        Enlace Quickstart: https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
// 
// NOTA 2: En este caso lo que realice fue instalar usando el comando indicado en el Quickstart (ng add @angular/fire)
//         y el cual nos pide que confirmemos que version de angularfire vamos a instalar. Ahora luego de confirmar 
//         durante el proceso sale un menu con las opciones para elegir que vamos a configurar en este caso no seleccione
//         nada y simplemente le di enter para terminar y no configurar nada.
//
//         Adicionalmente en el Quickstart nos van a pedir en uno de los pasos que agreguemos los environments de nuestra 
//         cuenta, para ello vamos a dirigirnos a los archivos environment.ts y environment.prod.ts y agregar un objeto 
//         llamado firebase, y el cual cintiene una información que vamos a obtener de la siguiente manera:
// 
//           1. Nos diregimos a la consola de firebase
//           2. Damos click en el proyecto de firebase con el que estamos trabajando
//           3. Luego damos click en el engrane y nos dirigimos a la opción configuración de proyecto
//           4. Bien al final de esa pantalla aparece un botón que nos permite agregar firebase a tu aplicación web 
//              y lo podemos identificar con los simbolos <>
//           5. Posteriormente de dar click en dicho botón nos va a aparecer que tenemos que registrar la app y para 
//              la cual vamos a asignar un nombre y luego dar click en el botón registrar app
//           6. A continuación nos va a generar una parte donde explica como configurar el SDK de firebase y si nos 
//              damos cuenta dentro de ese apartado tenemos la constante con las llaves y valores que vamos a copiar 
//              y colocar dentro de nuestro objeto en las variables de entorno.
//           
//           OJO: Hay que tener en cuenta que si tenemos producción y desarrollo debemos agregar dicha configuración 
//                donde corresponde y no ir a confundir los entornos.
//
// NOTA 3: Adicionalmeente como el proyecto marca error al importar las librerias (AngularFirestoreModule y AngularFirestore) en el archivo app.module.ts y en elinicio.component.ts
//         respectivamente y en el archivo inicio.component.ts, y esto debido al error "This type parameter might need an `extends firebase.firestore.DocumentData` constraint.". 
//         Entonces para evitar dicho error lo que vamos a hacer es saltar la comprobación y para lo cual lo que vamos a hacer es ir al archivo tsconfig.json y agregar al final del 
//         objeto compilerOptions lo siguiente: "skipLibCheck": true
// ---------------------------------------------------------------------------------------------------------------------------

// Importación AngularfireModule
import { AngularFireModule } from '@angular/fire/compat';

// Importación AngularfirestoreModule
import { AngularFirestoreModule }  from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GotyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    // Importación e inicialización Angularfire
    AngularFireModule.initializeApp(environment.firebase),
    // Importación AngularFirestoreModule
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
