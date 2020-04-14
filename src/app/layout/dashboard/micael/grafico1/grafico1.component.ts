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
  constructor(private ds: DashboardService, private router: Router) { }

  myChart: any;
  chartElem: any;
  listaDetalhada: any[];
  colunas = [];
  valores = [];

  escondido = true;
  @ViewChild("myChart", { static: true }) element: ElementRef;
  @ViewChild("myDetail", { static: true }) elemento: ElementRef;

  myDetail: any;

  graphClickEvent(event) {
    this.chartElem = this.myChart.getElementAtEvent(event);
    this.router.navigate(["/layout/statistics"], {
      state: { selectUnit: this.chartElem[0]._model.label }
    });
  }
  displayRoute() {
    return this.router.url === '/layout/dashboard/grafico1';
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.ds.getAllUnits().subscribe(dados => {
      dados.forEach(unidades => {
        this.colunas.push(unidades.unit);
        this.valores.push(unidades.interaction);
      });
      const colors = this.generateColor(this.colunas.length);
      this.myChart = new Chart("grafico1", {
        type: "horizontalBar",
        data: {
          labels: this.colunas,
          datasets: [
            {
              data: this.valores,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1,
              hoverBorderWidth: 3,
              hoverBorderColor: colors,
            }
          ]
        },
        options: {
          hover: {
            onHover: function (e) {
              var el = document.getElementById("grafico1");
              el.style.cursor = "pointer";
              console.log(el);
            }
          },
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function (tooltipItems, data) {
                return tooltipItems.xLabel + ' : ' + "Click for more info";
              }
            }
          },
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