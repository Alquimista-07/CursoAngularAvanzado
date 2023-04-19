// Clase que va a contener el modelo completo de un usuario

export class Usuario {

    // Los parametros que son opcionales tienen que ir al final (y el ? indica que es opcional) y los que son obligatorios al inicio
    constructor(
        public nombre: string, 
        public email: string, 
        public password?: string, 
        public img?: string, 
        public google?: boolean, 
        public role?: string, 
        public uid?: string) {}

}