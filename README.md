# CursoAngularAvanzado

Repositorio git creado para almacenar los ejercicios realizados para el curso de [Udemy](https://www.udemy.com/course/angular-avanzado-fernando-herrera/?kw=Angular+Avanzado%3A+Lleva+tus+bases+al+siguiente+nivel+-+MEAN&src=sac) - Angular Avanzado: Lleva tus bases al siguiente nivel - MEAN, Google Signin, JWT, carga de archivos, lazyload, optimizaciones, Git, GitHub, panel administrativo y mucho más.

Instructor: Fernando Herrera.

## Descripción

Este curso tiene por objetivo tomar tu conocimiento de `Angular` (Angular 2,4,5,6,7,8,9 o 10), y llevarlo al siguiente nivel creando una gran aplicación modular de gran escala.   

 El curso no pretende enseñarte las bases de Angular, ya que doy por hecho que sabes cómo programar utilizando el framework, al menos saber cómo utilizar servicios, componentes básicos, ciclo de vida de un componente y rutas, todo lo demás lo enseñaremos aquí.

 Este curso es totalmente práctico, aprenderemos haciendo una aplicación completa desde cero, que va desde el Front-End hasta el Backend, trabajando con MongoDB, JWT y Google SignIn.

Haciendo un resumen puntual de lo que contiene este curso es:
 
* MEAN Stack
  * Mongo
  * Express
  * Angular
  * node

* Estructura de una aplicación de Angular a gran escala
* Aplicación en base a módulos
* Tema administrativo Premium, pre-pagado para todos los alumnos de este curso (sin costo adicional) 
* Backend server completo:
  * Express
  * RESTFul API
  * Subida de archivos   
  * CORS   
  * MongoDB   
  * JWT   
  * Revisión de tokens de Google SignIn   
  * Paginaciones     
* Contenido de Angular enriquecido para trabajar con el el backend server   
* Pruebas unitarias   
* Pruebas de integración   
* Google SignIn protegido por token desde el Front-End hasta el Backend   
* Uso de librerías de terceros en proyectos de Angular   
* Rutas con configuraciones   
* Backups con GitHub   
* Control de versiones y releases   
* Generar la aplicación para distribución sobre Node y Apache   
* Y mucho más  

Al finalizar el curso de forma completa, no sólo conocerás más sobre Angular, tendrás el conocimiento necesario para empezar proyectos complejos en segundos usando el sistema de versionamiento que creamos aquí. El backend server es lo suficientemente `robusto` para utilizarlo donde quieras o usarlo de base para tus propias configuraciones, y el tema de las pruebas unitarias te servirá para poder tener la seguridad de que tu aplicación ha sido probada y te ayudará mucho cuando necesites pasarla a producción.

 Te invito a que revises las secciones gratuitas, el video de demostración del curso y el extenso plan de trabajo basado en videos cortos inferiores a los 10 minutos.

 Sé que este curso te servirá mucho en tu vida personal y profesional como desarrollador.
 
 # Instalaciones recomendadas - Angular Avanzado

## Instalaciones Necesarias
* [Google Chrome](https://www.google.com/chrome/)

* [Visual Studio Code](https://code.visualstudio.com/)

* [Postman](https://www.postman.com/downloads/)

* [Mongo Compass](https://www.mongodb.com/try/download/compass)

* [Git](https://git-scm.com/)
```
git config --global user.name "Tu nombre"
git config --global user.email "Tu correo"
```

* [Node](https://nodejs.org/es/)


## Extensiones de VSCode
[Activitus Bar](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.activitusbar)

### Configuración del Bracket Pair Colorizer 2

[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
```
"bracket-pair-colorizer-2.colors": [
    "#fafafa",
    "#9F51B6",
    "#F7C244",
    "#F07850",
    "#9CDD29",
    "#C497D4"
],
```
### Tema que estoy usando en VSCode:

* [Monokai Night](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-monokai-night)

* [Iconos](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

### Instalaciones recomendadas sobre Angular
* [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode)

* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

* [Angular Inline](https://marketplace.visualstudio.com/items?itemName=natewallace.angular2-inline)

* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

# 
# ANOTACIONES IMPORTANTES SOBRE DUDAS

Creo que lo primero es dejar bien en claro las definiciones:

`imports` hace que las declaraciones exportadas de otros módulos estén disponibles en el módulo actual.

`declarations` deben hacer que las directivas (incluidos los componentes y las tuberías) del módulo actual estén disponibles para otras directivas en el módulo actual. Los selectores de directivas, componentes o tuberías solo se comparan con el HTML si se declaran o importan.

`providers` son para hacer que los servicios y valores sean conocidos por DI (inyección de dependencia). Se agregan al ámbito raíz y se inyectan a otros servicios o directivas que los tienen como dependencia.

Entendiendo estos conceptos se puede decir: 

* Los `imports` se utilizan para importar módulos de soporte como FormsModule, RouterModule, CommonModule o cualquier otro módulo de características personalizado.

* los `declarations` se utilizan para declarar componentes, directivas, pipes que pertenecen al módulo actual. 

* Los `Providers` se utilizan para inyectar los servicios requeridos por componentes, directivas, tuberías en el módulo.
