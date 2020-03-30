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

  public dataInteration$:Observable<any[]> //quer ter um observavel daquele array
  public obs: DataInteraction[]=[];


  constructor(private http: HttpClient,
    private data: DataService
  ) { 
    // this.getAllData().subscribe((obs) => {
    //   this.obs = obs;
    //   console.log(this.obs);
    // });
  }


  ngOnInit() {
    // console.log("datainteration" ,this.dataInteration$);
    console.log("obj",this.obs);
    this.dataInteration$ = this.data.getAllData();
  
  }





  

}
