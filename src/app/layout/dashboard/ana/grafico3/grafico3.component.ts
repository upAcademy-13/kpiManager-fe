import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { tap } from 'rxjs/operators';


interface Week {
    value: string;
    viewValue: string;
  }


@Component({
    selector: 'grafico3',
  templateUrl: './grafico3.component.html',
  styleUrls: ['./grafico3.component.scss']
})

export class Grafico3Component implements OnInit {

    weeks: Week[] = [
        {value: 'Semana-1', viewValue: 'Semana 1'},
        {value: 'Semana-2', viewValue: 'Semana 2'},
        {value: 'Semana-3', viewValue: 'Semana 3'},
        {value: 'Semana-4', viewValue: 'Semana 4'}
      ];

    managers = [];
    cvs = [];

  constructor(private dashboard: DashboardService) { }

  ngOnInit() {

    this.dashboard.getAllManagers().subscribe((data: any[])=>{
        console.log(data);     
        data.forEach(cvPerManager => { 
          this.managers.push(cvPerManager.manager)
          this.cvs.push(cvPerManager.cvNumber) 
        });
        
        
        let myChart = new Chart('cvChart', {
          type: 'horizontalBar',
          data: {
                labels: this.managers,
              datasets: [{
                  label: 'Number of sent CV"s',
                  data: this.cvs,
                  backgroundColor: [
                      '#F26609',
                      '#F27A18',
                      '#ED9A25',
                      '#FFAF30',
                      '#FFC05D'
                      
                  ],
                  borderColor: [
                      'rgba(0, 0, 0)',
                      'rgba(0, 0, 0)',
                      'rgba(0, 0, 0)',
                      'rgba(0, 0, 0)',
                      'rgba(0, 0, 0)',
                      
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
        
    }) 
        
      }
    

}
