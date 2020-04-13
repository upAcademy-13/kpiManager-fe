import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from "chart.js";
import { BrowserTransferStateModule } from '@angular/platform-browser';

@Component({
  selector: 'conversao-semanal',
  templateUrl: './conversao-semanal.component.html',
  styleUrls: ['./conversao-semanal.component.scss']
})
export class ConversaoSemanalComponent implements OnInit {

  myChart: any;
  weeks = [];
  contractsCount = [];
  interviewsCount = [];
  chartElem: any;
  breakpoint: any;
  constructor(
    private router: Router,
    private dbService: DashboardService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.dbService.countAllContratsPerWeek().subscribe((data: any[]) => {
      console.log(data);
      
      data.forEach((interaction) => {
        this.weeks.push(interaction.week);
        this.contractsCount.push(interaction.contracts);
      });
      this.chartit();

    });

  
  }

  displayRoute() {
    return this.router.url === "/layout/dashboard/conversao-semanal";
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 1000 ? 1 : 2;
  }

  chartit() {
    console.log(this.contractsCount);
    
    this.myChart = new Chart("chartContracts", {
      type: "line",
      data: {
        labels: this.weeks,
        
        datasets: [
          {
            label: "Signed Contracts",
            fill: false,
            data: this.contractsCount,
            // backgroundColor: [
            //   /*    "rgba(255, 99, 132, 0.5)",
            //   "rgba(54, 162, 235, 0.5)",
            //   "rgba(255, 206, 86, 0.5)",
            //   "rgba(246, 8, 12, 0.5)",
            //   "rgba(153, 102, 255, 0.5)",
            //   "rgba(255, 159, 64, 0.5)",
            //   "rgba(33, 246, 33, 0.5)",
            //   "rgba(194, 30, 30, 0.5)",
            //   "rgba(112, 56, 4, 0.5)",
            //   "rgba(28, 28, 246, 0.5)",
            //   "rgba(235, 122, 9, 0.5)",
            //   "rgba(8, 246, 127, 0.5)", */
            //   "rgba(242, 102, 9, 0.8)",
            //   "rgba(242, 122, 24,  0.8)",
            //   "rgba(237, 154, 37,  0.8)",
            //   "rgba(255, 175, 48,  0.8)",
            //   "rgba(255, 192, 93,  0.8)",
            // ],
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
              "rgba(255, 192, 93, 1)",
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
              "#rgba(255, 192, 93, 1)",
            ],

          },
          {
            label: "Interviews",
            fill: false,
            data: this.interviewsCount,
            // backgroundColor: [
            //   /*    "rgba(255, 99, 132, 0.5)",
            //   "rgba(54, 162, 235, 0.5)",
            //   "rgba(255, 206, 86, 0.5)",
            //   "rgba(246, 8, 12, 0.5)",
            //   "rgba(153, 102, 255, 0.5)",
            //   "rgba(255, 159, 64, 0.5)",
            //   "rgba(33, 246, 33, 0.5)",
            //   "rgba(194, 30, 30, 0.5)",
            //   "rgba(112, 56, 4, 0.5)",
            //   "rgba(28, 28, 246, 0.5)",
            //   "rgba(235, 122, 9, 0.5)",
            //   "rgba(8, 246, 127, 0.5)", */
            //   "rgba(242, 102, 9, 0.8)",
            //   "rgba(242, 122, 24,  0.8)",
            //   "rgba(237, 154, 37,  0.8)",
            //   "rgba(255, 175, 48,  0.8)",
            //   "rgba(255, 192, 93,  0.8)",
            // ],
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
              "rgba(255, 192, 93, 1)",
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
              "#rgba(255, 192, 93, 1)",
            ],

          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom"
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
