import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: "grafico4",
  templateUrl: './grafico4.component.html',
  styleUrls: ['./grafico4.component.scss']
})
export class Grafico4Component implements OnInit {

  constructor() { }

  ngOnInit() {

    let massPopChart = new Chart("myChart", {
      type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5'],
        datasets: [{
          label: 'Clientes',
          data: [
            27,
            22,
            20,
            15,
            7,
            2
          ],
          //backgroundColor:'green',
          backgroundColor: [
            '#F26609', '#F27A18', '#ED9A25', '#FFAF30', '#FFC05D'
          ],
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Tipo de interações',
          fontSize: 25
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: '#000'
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });

  }

}
