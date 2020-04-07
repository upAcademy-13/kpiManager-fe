import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { Router } from '@angular/router';

interface Week {
  value: string;
  viewValue: string;
}

@Component({
  selector: "grafico4",
  templateUrl: "./grafico4.component.html",
  styleUrls: ["./grafico4.component.scss"]
})
export class Grafico4Component implements OnInit {
  myChart: any;
  chartElem: any;
  clients = [];
  interactions = [];
  constructor(private router: Router, private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.dashboard.getAllClientNames().subscribe((data: any[]) => {
      data.forEach(clients => {
        this.clients.push(clients.client);
        this.interactions.push(clients.interactions);
      });
      this.clientInteractionChart();
    });
  }
  graphClickEvent(event) {
    console.log(event);
    
    this.chartElem = this.myChart.getElementAtEvent(event);
    this.router.navigate(["/layout/statistics"], {
      state: { selectClient: this.chartElem[0]._model.label }
    });
  }
  clientInteractionChart() {
      this.myChart = new Chart("myChart4", {
        type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
          labels: this.clients,
          datasets: [
            {
              data: this.interactions,
              //backgroundColor:'green',
              backgroundColor: [
                "rgba(242, 102, 9, 0.8)",
                "rgba(242, 122, 24,  0.8)",
                "rgba(237, 154, 37,  0.8)",
                "rgba(255, 175, 48,  0.8)",
                "rgba(255, 192, 93,  0.8)"
              ],
              borderColor: [
                "rgba(242, 102, 9, 1)",
                "rgba(242, 122, 24, 1)",
                "rgba(237, 154, 37, 1)",
                "rgba(255, 175, 48, 1)",
                "rgba(255, 192, 93, 1)"
              ],
              borderWidth: 1,
              hoverBorderWidth: 3,
              hoverBorderColor: [
                "rgba(242, 102, 9, 1)",
                "rgba(242, 122, 24, 1)",
                "rgba(237, 154, 37, 1)",
                "#rgba(255, 175, 48, 1)",
                "#rgba(255, 192, 93, 1)"
              ]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 1,
                  beginAtZero: true
                }
              }
            ]
          },
          title: {
            display: false,
            text: "Client with most interactions",
            fontSize: 25
          },
          legend: {
            display: false,
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
    }
  }
