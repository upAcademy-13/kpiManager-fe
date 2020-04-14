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
  constructor(private router: Router, private dashboard: DashboardService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
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

  displayRoute() {
    return this.router.url === '/layout/dashboard/grafico4';
  }

  clientInteractionChart() {
    const colors = this.generateColor(this.clients.length);
    console.log(colors);

    this.myChart = new Chart("myChart4", {
      type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: this.clients,
        datasets: [
          {
            data: this.interactions,

            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: colors
          }
        ]
      },
      options: {
        hover: {
          onHover: function (e) {
            var el = document.getElementById("myChart4");
            el.style.cursor = "pointer";
            console.log(el);
          }
        },
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
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {
              return tooltipItems.yLabel + ' : ' + "Click for more info";
            }
          }
        }
      }
    });
  }

  generateColor(length) {
    let data = [];
    for (let index = 0; index < length; index++) {
      var colors = {
        r: Math.floor(253 + Math.random() * 2),
        g: Math.floor(50 + Math.random() * 161),
        b: Math.floor(40 + Math.random() * 44)
      };
      data.push(`rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.8)`);
    }
    return data;
  }
}
