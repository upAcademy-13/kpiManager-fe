import {Chart} from 'chart.js';
import {Component, OnInit, ViewChild, ElementRef, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__} from '@angular/core';
@Component({
  selector: 'app-dashboard-grafico1',
  templateUrl: './grafico1.component.html',
  styleUrls: ['./grafico1.component.scss']
})
export class Grafico1Component implements OnInit {

listaDetalhada: any [];
colunas: string [];
valores: number [];

escondido = true;
@ViewChild('myChart', {static: true}) element: ElementRef;
@ViewChild('myDetail', {static: true}) elemento: ElementRef;

  myChart: any;
  myDetail: any;
  ngOnInit(): void {
    this.myChart = new Chart(this.element.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Unidade_A', 'Unidade_B', 'Unidade_C', 'Unidade_D', 'Unidade_E', 'Unidade_F', 'Nearshore', 'Porto' ],
        datasets: [{
          label: 'Distribuiçã Salarial da Aubay',
          data: [3000, 2000, 4000, 3050, 2500, 1500],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]

      },

    });
  }

  graphClickEvent(event) {
  const idClicado: number = this.myChart.chart.getElementAtEvent(event)[0]._index;
  this.desenhaDetalhe(idClicado);
  console.log(idClicado);
}

desenhaDetalhe(clicado: number) {
  const barraClicada: number = clicado;
  const labelNovo: string [ ] = ['Unidade_AAA', 'Unidade_B', 'Unidade_C', 'Unidade_D', 'Unidade_E', 'Unidade_F', 'Nearshore', 'Porto' ];
  const dadoNovo: any [ ] = [3000, 2000, 1400, 3050, 2500, 1500, 21545, 8656];

  this.myDetail = new Chart(this.elemento.nativeElement, {
    type: 'bar',
    data: {
      labels: labelNovo ,
      datasets: [{
        label: 'Distribuiçã Salarial da Mota Engil São Tomé',
        data: dadoNovo,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 4
    }]

    },

  });
  this.escondido = !this.escondido;

  // tslint:disable-next-line: deprecation
  
}

graficoInicial() {
  this.ngOnInit();
  this.escondido = true;
  console.log(this.escondido);
}

getListadetalhada(id: number) {
  //pega id da coluna clicada
  // retorna a lista de objecos com nome de cada interaçao
  // e valor total dentro da iteraçao.
}
criaLabelAndValor() {

this.listaDetalhada.forEach(obj => {
  this.colunas.push(obj.name);
  this.valores.push(obj.valor);
 });
}

}
