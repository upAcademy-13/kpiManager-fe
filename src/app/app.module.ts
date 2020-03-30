import { Grafico1Component } from './dashboard/micael/grafico1/grafico1.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutNavBarComponent } from './layout-nav-bar/layout-nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';

// import { NgxChartsModule } from '@swimlane/ngx-charts'; // adicionado

// import { ChartsModule } from 'ng2-charts'; // adicionado

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutNavBarComponent,
   // NgxChartsModule, // adicionado
   // BrowserAnimationsModule // adicionado
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    
   // ChartsModule // adicionado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
