# CursoAngular

# NOTAS IMPORTANTES

Configuración Inicial
=====================

Como este es un backend que se va a crear con node para crearlo debemos ejecutar los siguientes pasos:

1. El siguiente comando nos permite inicializar y crear de manera automática el archivo package.json

```
npm init -y
```

2. Posteriormente procedemos a instalar express usando el siguiente comando:

```
npm install express --save
```

El paquete express es la parte crucial para montar rápidamente un servidor con servicios REST, además de que es un framework muy puplar.


3. Luego en la ruta nos creamos un archivo index.js que es nuestro punto inicial.

4. Podemos colocar un console.log('Hola desde Node') dentro del archivo index.js que creamos para probar.

5. Posteriormente procedemos a ejecutar en la consola el siguiente comando:
```
node index.js
```

Y esto nos va a responder con el consolo.log() que hayamos puesto.

Adicionalmente indicar la extensión .js al archivo es opcional y tenemos exactamente el mismo resultado.

```
node index
```

6. Adicionalmente podemos instalar Nodemon, el cual nos permite hacer live reload del servidor permitiendonos desarrollar de una manera más rápida. Para instalarlo debemos ejecutar el siguiente comando el cual instala el paquete de manera global:

```
npm install -g nodemon
```

NOTA: Como sabemos si no queremos instalar el paquete de manera global lo unico que debemos hacer es reemplazar el -g y por un --save-dev

Adicionalmente podemos ver más documentación sobre Nodemon en el siguiente enlace: 

* [Nodemon](https://www.npmjs.com/package/nodemon)

7. Posteriormente de tener instalado Nodemon lo unico que debemos hacer es ejecutar nuestro servidor ejecutando el siguiente comando:

```
nodemon index.js
```
Y de esta manera ahora el live reload va a estar escuchando siempre los cambios y podremos ver los cambios que realicemos en nuestro codigo en tiempo real y sin tener que bajar y volver a subir el servidor.

8. Luego también podemos configurar los scripts, los cuales no es que sea obligatorio configurarlos, pero nos va a ayudar a no tener que memorizarnos cual es el punto de inicio de nuestra aplicación, y que tengo que hacer cuando lo despliegue. Entonces para ello abrimos el archivo package.json que se había creado anteriormente y agregamos los siguientes scripts:

```
"dev": "nodemon index.js",
"start": "node index.js"
```

Ó podemos definir el script también de la siguiente manera:

```
"start:dev": "nodemon index.js",
"start": "node index.js"
```

NOTA: Cuando especificamos "dev" o "start:dev" lo que hace es ejecutar el index.js usando Nodemon para desarrollo y el "start" es para cuando pasemos la aplicación a producción y le indique que ejecute el archivo index.js usando el comando node.

9. Por lo tanto ya con la configuración de los scripts ya no sería necesario ejecutar el comando "nodemon index.js" como se había explicado anteriormente, sino que ya solo deberíamos usar el siguiente comando:

```
npm run dev
```

Ó si lo definimos como "start:dev" ejecutamos el comando de la siguiente forma:

```
npm run start:dev
```

Y lo que le decimos es que cuando yo ejecute "npm run" le indicamos que ejecute un script llamado "dev" o "start:dev", y por lo tanto tenemos exactamente el mismo resultado que cuando ejecutamos el comando "nodemon index.js"

10. Ahora ya cuando vayamos a ejecutar la aplicación en producción no es necesario indicar el "run" sino que simplemente ejecutamos "npm" y le indicamos que el script se llama "start" de la siguiente manera:

```
npm start
```
