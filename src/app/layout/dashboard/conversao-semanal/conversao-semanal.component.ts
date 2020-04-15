import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Chart } from "chart.js";
import { BrowserTransferStateModule } from "@angular/platform-browser";

@Component({
  selector: "conversao-semanal",
  templateUrl: "./conversao-semanal.component.html",
  styleUrls: ["./conversao-semanal.component.scss"],
})
export class ConversaoSemanalComponent implements OnInit {
  myChart: any;
  weeks = [];
  contractsCount = [];
  acceptedContractsCount = [];
  chartElem: any;
  breakpoint: any;
  constructor(
    private router: Router,
    private dbService: DashboardService,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.dbService.countAllContratsPerWeek().subscribe((data: any[]) => {
      data.forEach((contracts) => {
        this.weeks.push(contracts.week);
        this.contractsCount.push(contracts.contracts);
      });
      this.dbService.countAcceptedContratsPerWeek().subscribe((data1: any[]) => {
        console.log("all contracts",this.contractsCount);
        console.log(data1);
        
        data1.forEach((contracts) => {
          this.acceptedContractsCount.push(contracts.contracts);
        });
        console.log("accepted contracts",this.acceptedContractsCount);
        this.chartit();
      });
    });
  }

  displayRoute() {
    return this.router.url === "/layout/dashboard/conversao-semanal";
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 1000 ? 1 : 2;
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

  chartit() {
    const colors = this.generateColor(2);
    this.myChart = new Chart("chartContracts", {
      type: "line",
      data: {
        labels: this.weeks,
        datasets: [
          {
            label: "Signed Contracts",
            fill: false,
            data: this.acceptedContractsCount,
            backgroundColor: [
              colors[0]
            ],
            borderColor: [
              colors[0]
            ],
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverBorderColor: [
              colors[0]
            ],
          },
          {
            data: this.contractsCount,
            label: "All Contracts",
            fill: false,
            backgroundColor: [
              colors[1]
            ],
            borderColor: [
              colors[1]
            ],
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverBorderColor: [
              colors[1]
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "top",
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
