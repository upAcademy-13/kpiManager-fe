import {
  Component,
  OnInit,
  Output,
  Input,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Chart } from "chart.js";
import { DashboardService } from "src/app/core/services/dashboard.service";
import * as moment from "moment";
import { Router } from "@angular/router";

interface Week {
  value: string;
  viewValue: string;
}

@Component({
  selector: "grafico3",
  templateUrl: "./grafico3.component.html",
  styleUrls: ["./grafico3.component.scss"],
})
export class Grafico3Component implements OnInit {
  managers = [];
  cvs = [];
  weeks = [];
  chartElem: any;
  myChart: any;
  selected = "";

  constructor(private dashboard: DashboardService, private router: Router) {}

  ngOnInit() {
    this.getDataWeek();
  }

  displayRoute() {
    return this.router.url === "/layout/dashboard/grafico3";
  }

  graphClickEvent(event) {
    this.chartElem = this.myChart.getElementAtEvent(event);
    this.router.navigate(["/layout/statistics"], {
      state: {
        selectManager: this.chartElem[0]._model.label,
        selectWeek: this.selected,
      },
    });
  }

  changeWeek(selectedWeek) {
    this.selected = selectedWeek;
    this.managers = [];
    this.cvs = [];
    this.myChart.destroy();
    this.getDataforGraph(this.selected);
  }

  getDataWeek() {
    this.dashboard.getAllWeeks().subscribe((allWeeks: any[]) => {
      /* allWeeks.sort((a, b) => {return a-b}); */
      allWeeks.forEach((res) => this.weeks.push(res));
      console.log(this.weeks);
      let lastWeek = this.weeks.length - 1;
      this.selected = this.weeks[lastWeek];
      console.log(this.selected);
      this.getDataforGraph(this.selected);
    });
  }

  getDataforGraph(week) {
    this.dashboard.getAllManagers(week).subscribe((data: any[]) => {
      console.log(data);
      
      data.forEach((cvPerManager) => {
        this.managers.push(cvPerManager.manager);
        this.cvs.push(cvPerManager.cvNumber);
      });
      this.createChart(this.managers, this.cvs);
    });
  }

  createChart(managers: any[], cvs: any[]) {
    this.myChart = new Chart("cvChart", {
      type: "horizontalBar",
      data: {
        labels: managers,
        datasets: [
          {
            data: cvs,
            backgroundColor: [
              "rgba(242, 102, 9, 0.8)",
              "rgba(242, 122, 24,  0.8)",
              "rgba(237, 154, 37,  0.8)",
              "rgba(255, 175, 48,  0.8)",
              "rgba(255, 192, 93,  0.8)",
            ],
            borderColor: [
              "rgba(242, 102, 9, 1)",
              "rgba(242, 122, 24, 1)",
              "rgba(237, 154, 37, 1)",
              "rgba(255, 175, 48, 1)",
              "rgba(255, 192, 93, 1)",
            ],
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: [
              "rgba(242, 102, 9, 1)",
              "rgba(242, 122, 24, 1)",
              "rgba(237, 154, 37, 1)",
              "#rgba(255, 175, 48, 1)",
              "#rgba(255, 192, 93, 1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
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
