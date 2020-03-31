import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

interface Week {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'grafico4',
  templateUrl: './grafico4.component.html',
  styleUrls: ['./grafico4.component.scss']
})
export class Grafico4Component implements OnInit {

  //drilldown das semanas
  weeks: Week[] = [
    { value: 'Semana-1', viewValue: 'Semana 1' },
    { value: 'Semana-2', viewValue: 'Semana 2' },
    { value: 'Semana-3', viewValue: 'Semana 3' },
    { value: 'Semana-4', viewValue: 'Semana 4' }
  ];

  constructor() { }

  ngOnInit() {
    let massPopChart = new Chart("myChart", {
      type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: ['Cliente1', 'Cliente2', 'Cliente3', 'Cliente4', 'Cliente5', 'Cliente6'],
        datasets: [{
          label: 'Nº de Interações',
          data: [
            27,
            22,
            17,
            10,
            7,
            2
          ],
          //backgroundColor:'green',
          backgroundColor: [
            '#F26609',
            '#F27A18',
            '#ED9A25',
            '#FFAF30',
            '#FFC05D'
          ],
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0)',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        }]
      },
      options: {
        title: {
          display: false,
          text: 'Cliente com mais interacção',
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


