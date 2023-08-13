import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnDestroy {

  results: any[] = [
    {
      "name": "Juego 1",
      "value": 20
    },
    {
      "name": "Juego 2",
      "value": 25
    },
    {
      "name": "Juego 3",
      "value": 15
    },
    {
      "name": "Juego 4",
      "value": 30
    }
  ];

  // options
  showXAxis      = true;
  showYAxis      = true;
  gradient       = true;
  showLegend     = true;
  showXAxisLabel = true;
  xAxisLabel     = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel     = 'Votos';

  colorScheme = 'nightLights';

  // intervalo;

  constructor() {

    // this.intervalo = setInterval( () => {

    //   console.log('tick');

    //   const newResults = [ ...this.results ];

    //   // Barremos el objeto de resultados y cambiamos los valores en tiempo real en un intervalo de tiempo
    //   for( let i in newResults ){
    //     newResults[i].value = Math.round(Math.random() * 500);
    //   }

    //   this.results = [ ...newResults ];

    // }, 1500);

  }

  // Implementamos el ngOnDestroy para terminar el intervalo y de esta forma evitar la fuga de memoria
  // ya que este intervalo queda activo aún cuando cambiemos de pantalla
  ngOnDestroy(): void {
    // clearInterval( this.intervalo );
  }

  onSelect(event: any) {
    console.log(event);
  }

}
