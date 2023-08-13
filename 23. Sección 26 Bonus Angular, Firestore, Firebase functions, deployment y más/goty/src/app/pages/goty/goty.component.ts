import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';

// Importación Sweet Alert para mostrar las ventanas emergentes de confirmación
import Swal from 'sweetalert2';

// Importación servicio
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor( private gameService: GameService ) { }

  ngOnInit(): void {
    this.gameService.getNominados()
        .subscribe( games => {
          this.juegos = games;
          console.log(this.juegos);
        })
  }

  votarJuego( juego: Game ){
    // console.log(juego);
    this.gameService.votarJuego( juego.id )
        .subscribe( (resp: any) => {
          if( resp.ok ){
            Swal.fire( 'Gracias', resp.msg, 'success' );
          }
        })

  }

}
