import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})
export class TableClientComponent implements OnInit {

  clients = [];
  potentialRevenue = [];
  breakpoint: any;
  constructor(
    private router: Router,
    private dbService: DashboardService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    // this.dbService.countAllContratsPerWeek().subscribe((data: any[]) => {

    //   data.forEach((interaction) => {
    //     this.weeks.push(interaction.week);
    //     this.contractsCount.push(interaction.contracts);
    //   });
    //   this.dbService.countAllInterviewsPerWeek().subscribe((data1: any[]) => {
    //     data1.forEach((interview) => {
    //       this.interviewsCount.push(interview.interviews)
    //     })
        
    //   })
      

    // });


  }

  displayRoute() {
    return this.router.url === "/layout/dashboard/table-client";
  }


}
