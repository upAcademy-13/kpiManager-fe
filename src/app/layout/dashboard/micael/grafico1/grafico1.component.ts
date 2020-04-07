import { Router } from "@angular/router";
import { Chart } from "chart.js";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DashboardService } from "src/app/core/services/dashboard.service";
@Component({
  selector: "grafico1",
  templateUrl: "./grafico1.component.html",
  styleUrls: ["./grafico1.component.scss"]
})
export class Grafico1Component implements OnInit {
  constructor(private ds: DashboardService, private router: Router) {}

  myChart: any;
  listaDetalhada: any[];
  colunas = [];
  valores = [];

  escondido = true;
  @ViewChild("myChart", { static: true }) element: ElementRef;
  @ViewChild("myDetail", { static: true }) elemento: ElementRef;

  myDetail: any;

  graphClickEvent(event) {
    const idClicado: number = this.myChart.chart.getElementAtEvent(event)[0]
      ._label;
    this.router.navigate(["/estatistica"], {
      state: { labelClicado: idClicado }
    });
    console.log(idClicado);
  }

  ngOnInit(): void 
  {
    this.ds.getAllUnits().subscribe(dados => {
      console.log(dados);
      dados.forEach(unidades => {
        this.colunas.push(unidades.unit);
        this.valores.push(unidades.interaction);
      });

      this.myChart = new Chart("grafico1", {
        type: "horizontalBar",
        data: {
          labels: this.colunas,
          datasets: [
            {
              data: this.valores,
              backgroundColor: [
              /*   "rgba(251, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(25, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(250, 159, 64, 0.2)" */
                "rgba(242, 102, 9, 0.8)",
                "rgba(242, 122, 24,  0.8)",
                "rgba(237, 154, 37,  0.8)",
                "rgba(255, 175, 48,  0.8)",
                "rgba(255, 192, 93,  0.8)"
              ],
              borderColor: [
               /*  "rgba(251, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(25, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(250, 159, 64, 1)" */
                "rgba(242, 102, 9, 1)",
                "rgba(242, 122, 24, 1)",
                "rgba(237, 154, 37, 1)",
                "rgba(255, 175, 48, 1)",
                "rgba(255, 192, 93, 1)"
              ],
              borderWidth: 1,
              hoverBorderWidth: 3,
              hoverBorderColor: [
             /*  "rgba(251, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(25, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(250, 159, 64, 1)" */
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
  })
}
}