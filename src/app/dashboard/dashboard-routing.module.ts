import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { Grafico3Component } from './ana/grafico3/grafico3.component';
import { Grafico2Component } from './filipe/grafico2/grafico2.component';
import { Grafico1Component } from './micael/grafico1/grafico1.component';
import { Grafico4Component } from './vasco/grafico4/grafico4.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'grafico1', component: Grafico1Component },
  { path: 'grafico2', component: Grafico2Component },
  { path: 'grafico3', component: Grafico3Component },
  { path: 'grafico4', component: Grafico4Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
