import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/core/services/dashboard.service';

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

  client = [];
  interactions = [];
  constructor(private dashboard: DashboardService) { }

  ngOnInit(): void {

    this.dashboard.getAllClientNames().subscribe((data: any[]) => {
      console.log(data);

      data.forEach(clients => {
        this.client.push(clients.client)
        this.interactions.push(clients.interactions)
      });

      let massPopChart = new Chart("myChart4", {
        type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
          labels: this.client,
          datasets: [{
            label: 'Nº de Interações',
            data:
              this.interactions,

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
              left: 0,
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


    })

    console.log(this.client)

    //dados do grafico



  }

}


// 'Cliente1', 'Cliente2', 'Cliente3', 'Cliente4', 'Cliente5', 'Cliente6'