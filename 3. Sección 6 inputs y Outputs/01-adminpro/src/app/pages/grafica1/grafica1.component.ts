import { Component } from '@angular/core';

import { ChartData, Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

   // Definimos los colores para cada una de las entradas
   public colors: Color[] = [
    '#6857E6',
    '#009FEE',
    '#F02059'
  ];

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ], backgroundColor: this.colors }
    ]
  };

}
