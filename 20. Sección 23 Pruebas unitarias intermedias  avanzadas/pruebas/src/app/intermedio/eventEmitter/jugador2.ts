import { EventEmitter } from '@angular/core';

export class Jugador2 {

    puntosVida: number;
    puntosVidaCambia = new EventEmitter<number>();

    constructor() {
        this.puntosVida = 100;
    }

    recibeDanio( danio: number ){

        if( danio >= this.puntosVida ){
            this.puntosVida = 0;
        } else {
            this.puntosVida = this.puntosVida - danio
        }

        this.puntosVidaCambia.emit( this.puntosVida );

    }

}