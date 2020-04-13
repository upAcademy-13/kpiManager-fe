import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { DataInteraction } from 'src/app/core/models/dataInteration';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  // public dataInteration$:Observable<any[]> //quer ter um observavel daquele array
  
  public allData$:Observable<any[]>;
  public allWeek$:Observable<any>; 
  public allClients$:Observable<any>;
  public allBManagers$:Observable<any>;
  public allInteractions$:Observable<any>;
  public allUnities$:Observable<any>;
  public allBetween$:Observable<any[]>;
  public allRevenueClient$:Observable<any[]>;
  public allRevenueManager$:Observable<any[]>;

  constructor(private http: HttpClient,
    private data: DataService
  ) { 
   
  }


  ngOnInit() {
    this.allData$ = this.data.getAllData();    
    this.allWeek$ = this.data.getAllWeeks();
    this.allClients$ = this.data.getAllClients();
    this.allBManagers$ = this.data.getAllBManagers();
    this.allInteractions$ = this.data.getAllInteractions();
    this.allUnities$ = this.data.getAllUnities();
    this.allRevenueClient$ = this.data.getAllRevenueClient();
    this.allRevenueManager$ = this.data.getAllRevenueManager();
    
    // this.data.getAllData().subscribe(res => {
    //   console.log('AllData = ', res);
    // });

    // this.data.getAllWeeks().subscribe(res => {
    //   console.log('AllWeeks = ', res);
    // });

    // this.data.getAllClients().subscribe(res => {
    //   console.log('ALLCLIENTES = ', res);
    // });

    // this.data.getAllBManagers().subscribe(res => {
    //   console.log('ALLBManager = ', res);
    // });

    // this.data.getAllInteractions().subscribe(res => {
    //   console.log('ALLInteractions = ', res);
    // });

    // this.data.getAllUnities().subscribe(res => {
    //   console.log('ALLUnities = ', res);
    // });

    this.data.getAllRevenueClient().subscribe(res => {
       console.log('revenueClient = ', res);
     });

     this.data.getAllRevenueManager().subscribe(res => {
      console.log('revenueManager = ', res);
    });
  }


}
