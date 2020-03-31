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


  constructor(private http: HttpClient,
    private data: DataService
  ) { 
    // this.getAllData().subscribe((obs) => {
    //   this.obs = obs;
    //   console.log(this.obs);
    // });
  }


  ngOnInit() {
    // console.log("obj",this.obs);
    // this.dataInteration$ = this.data.getAllData();
  

    this.allData$ = this.data.getAllData();    
    this.allWeek$ = this.data.getAllWeeks();
    this.allClients$ = this.data.getAllClients();
    this.allBManagers$ = this.data.getAllBManagers();
    this.allInteractions$ = this.data.getAllInteractions();
    this.allUnities$ = this.data.getAllUnities();

    this.data.getAllData().subscribe(res => {
      console.log('AllData = ', res);
    });

    this.data.getAllWeeks().subscribe(res => {
      console.log('AllWeeks = ', res);
    });

    this.data.getAllClients().subscribe(res => {
      console.log('ALLCLIENTES = ', res);
    });

    this.data.getAllBManagers().subscribe(res => {
      console.log('ALLBManager = ', res);
    });

    this.data.getAllInteractions().subscribe(res => {
      console.log('ALLInteractions = ', res);
    });

    this.data.getAllUnities().subscribe(res => {
      console.log('ALLUnities = ', res);
    });
  }


}
