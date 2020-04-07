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
  ) {}

  ngOnInit(): void {
    this.dbService.getAllInteractionTypes().subscribe((data: any[]) => {
      data.forEach((interactionType) => {
        this.interactionTypes.push(interactionType.interactions);
        this.interactionsCount.push(interactionType.count);
      });
      this.chartit();
    });
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
    this.myChart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: this.interactionTypes,
        datasets: [
          {
            data: this.interactionsCount,
            backgroundColor: [
           /*    "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(246, 8, 12, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(33, 246, 33, 0.5)",
              "rgba(194, 30, 30, 0.5)",
              "rgba(112, 56, 4, 0.5)",
              "rgba(28, 28, 246, 0.5)",
              "rgba(235, 122, 9, 0.5)",
              "rgba(8, 246, 127, 0.5)", */
              "rgba(242, 102, 9, 0.8)",
              "rgba(242, 122, 24,  0.8)",
              "rgba(237, 154, 37,  0.8)",
              "rgba(255, 175, 48,  0.8)",
              "rgba(255, 192, 93,  0.8)"
            ],
            borderColor: [
           /*    "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(246, 8, 12, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(33, 246, 33, 1)",
              "rgba(194, 30, 30, 1)",
              "rgba(112, 56, 4, 1)",
              "rgba(28, 28, 246, 1)",
              "rgba(235, 122, 9, 1)",
              "rgba(8, 246, 127, 1)", */
              "rgba(242, 102, 9, 1)",
              "rgba(242, 122, 24, 1)",
              "rgba(237, 154, 37, 1)",
              "rgba(255, 175, 48, 1)",
              "rgba(255, 192, 93, 1)"
            ],
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: [
              /* "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(246, 8, 12, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(33, 246, 33, 1)",
              "rgba(194, 30, 30, 1)",
              "rgba(112, 56, 4, 1)",
              "rgba(28, 28, 246, 1)",
              "rgba(235, 122, 9, 1)",
              "rgba(8, 246, 127, 1)", */
              "rgba(242, 102, 9, 1)",
                "rgba(242, 122, 24, 1)",
                "rgba(237, 154, 37, 1)",
                "#rgba(255, 175, 48, 1)",
                "#rgba(255, 192, 93, 1)"
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
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
}
