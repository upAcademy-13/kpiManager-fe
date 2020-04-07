import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { DashboardService } from "src/app/core/services/dashboard.service";
import * as moment from 'moment';

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
  date: any;
  public numWeek: any;
  static getCurrentDate: any;

  // weeks: Week[] = [
  //   { value: "Semana-1", viewValue: "Semana 1" },
  //   { value: "Semana-2", viewValue: "Semana 2" },
  //   { value: "Semana-3", viewValue: "Semana 3" },
  //   { value: "Semana-4", viewValue: "Semana 4" }
  // ];

  managers = [];
  cvs = [];

  constructor(private dashboard: DashboardService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  ngOnInit() {
    this.dashboard.getAllManagers().subscribe((data: any[]) => {
      data.forEach(cvPerManager => {
        this.managers.push(cvPerManager.manager);
        this.cvs.push(cvPerManager.cvNumber);
      });

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
}
