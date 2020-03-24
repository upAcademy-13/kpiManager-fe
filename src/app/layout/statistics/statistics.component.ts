import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public dataInteration$:Observable<any[]> //quer ter um observavel daquele array


  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.dataInteration$ = this.data.getAllData();
  }

}
