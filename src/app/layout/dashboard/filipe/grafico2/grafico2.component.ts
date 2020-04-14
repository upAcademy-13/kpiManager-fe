import { Component, OnInit, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { Router } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "grafico2",
  templateUrl: "./grafico2.component.html",
  styleUrls: ["./grafico2.component.scss"],
})
export class Grafico2Component implements OnInit {
  myChart: any;
  interactionTypes = [];
  interactionsCount = [];
  chartElem: any;
  breakpoint: any;
  constructor(
    private router: Router,
    private dbService: DashboardService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.dbService.getAllInteractionTypes().subscribe((data: any[]) => {
      data.forEach((interactionType) => {
        this.interactionTypes.push(interactionType.interactions);
        this.interactionsCount.push(interactionType.count);
      });
      this.chartit();
    });
  }

  displayRoute() {
    return this.router.url === "/layout/dashboard/grafico2";
  }

  graphClickEvent(event) {
    this.chartElem = this.myChart.getElementAtEvent(event);
    this.router.navigate(["/layout/statistics"], {
      state: { selectInteraction: this.chartElem[0]._model.label },
    });
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 1000 ? 1 : 2;
  }

  chartit() {
    const colors = this.generateColor(this.interactionTypes.length);

    this.myChart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: this.interactionTypes,
        datasets: [
          {
            data: this.interactionsCount,
            backgroundColor:
              colors,
            borderColor: colors,
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: colors,
          },
        ],
      },
      options: {
        hover: {
          onHover: function (e) {
            var el = document.getElementById("myChart");
            el.style.cursor = "pointer";
            console.log(el);
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
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              },
            },
          ],
        },
      },
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
