
export class Jugador {

    puntosVida: number;

    constructor() {
        this.puntosVida = 100;
    }

    recibeDanio( danio: number ){

        if( danio >= this.puntosVida ){
            this.puntosVida = 0;
        } else {
            this.puntosVida = this.puntosVida - danio
        }

        return this.puntosVida;

    }

}