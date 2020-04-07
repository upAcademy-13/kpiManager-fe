import { Component, OnInit, Output, Input } from "@angular/core";
import { Chart } from "chart.js";
import { DashboardService } from "src/app/core/services/dashboard.service";
import * as moment from 'moment';
import { Router } from '@angular/router';

interface Week {
  value: string;
  viewValue: string;
}

@Component({
  selector: "grafico3",
  templateUrl: "./grafico3.component.html",
  styleUrls: ["./grafico3.component.scss"]
})
export class Grafico3Component implements OnInit {

  placeHolderText = "Select date";
  dateChoose = "";
  hasError = false;
  maxDate = new Date();
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  date: any;
  public numWeek: any;
  static getCurrentDate: any;

  managers = [];
  cvs = [];
  weeks = [];
  chartElem: any;
  myChart: any;
  selected = "";

  constructor(private dashboard: DashboardService, private router: Router) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit() {
    this.getDataWeek();
  }

  displayRoute() {
    return this.router.url === '/layout/dashboard/grafico3';
  }

  graphClickEvent(event) {
    this.chartElem = this.myChart.getElementAtEvent(event);
    this.router.navigate(["/layout/statistics"], {
      state: { selectManager: this.chartElem[0]._model.label }
    });
  }

  changeWeek(selectedWeek) {
    this.selected = selectedWeek;
    console.log(this.selected);
    this.myChart = null;
    console.log(this.myChart);
    this.getDataforGraph(this.selected);

  }


  getDataWeek() {

    this.dashboard.getAllWeeks().subscribe((allWeeks: any[]) => {
      allWeeks.forEach(res => this.weeks.push(res));
      console.log(this.weeks);
      let lastWeek = this.weeks.length - 1;
      this.selected = this.weeks[lastWeek];
      console.log(this.selected);
      this.getDataforGraph(this.selected)

    });
  }

  getDataforGraph(week) {
    this.dashboard.getAllManagers(week).subscribe((data: any[]) => {
      data.forEach(cvPerManager => {
        this.managers.push(cvPerManager.manager);
        this.cvs.push(cvPerManager.cvNumber);
        this.createChart(this.managers, this.cvs);
      });

<<<<<<< HEAD
      let myChart = new Chart("cvChart", {
        type: "horizontalBar",
        data: {
          labels: this.managers,
          datasets: [
            {
              data: ["1","1","1","1"],//this.cvs,
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
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 1,
                  beginAtZero: true
                }
              }
=======
    })
  }

  

  createChart(managers: any[], cvs: any[]) {
    this.myChart = null;
    this.myChart = new Chart("cvChart", {
      type: "horizontalBar",
      data: {
        labels: managers,
        datasets: [
          {
            label: 'Nº of CV"s sent',
            data: cvs,
            backgroundColor: [
              "rgba(242, 102, 9, 0.8)",
              "rgba(242, 122, 24,  0.8)",
              "rgba(237, 154, 37,  0.8)",
              "rgba(255, 175, 48,  0.8)",
              "rgba(255, 192, 93,  0.8)"
>>>>>>> dashboard/feature/grafico3
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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                stepSize: 1,
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }



  getCurrentDate(tcode: string) {
    console.log("Data escolhida " + tcode);
    let newDate = tcode.split(" ");
    let dataInicio = newDate[0];
    let dataFinal = newDate[2];
    console.log("Data de inicio: " + dataInicio);
    console.log("Data final: " + dataFinal);
    let data = moment(dataInicio, "MM-DD-YYYY");
    console.log(data);
    this.numWeek = data.week();
    console.log(this.numWeek);
  }

  validateError(value: String) {
    this.hasError = false;
  }
}
