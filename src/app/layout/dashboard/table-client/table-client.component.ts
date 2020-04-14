import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "table-client",
  templateUrl: "./table-client.component.html",
  styleUrls: ["./table-client.component.scss"],
})
export class TableClientComponent implements OnInit {
  clients = [];
  potentialRevenue = [];
  breakpoint: any;
  constructor(private router: Router, private dbService: DashboardService) {}

  ngOnInit(): void {
    this.dbService.getTop5PotentialRevenue().subscribe((data: any[]) => {
      console.log(data);
      data.forEach((client) => {
        this.clients.push(client[0]);
        this.potentialRevenue.push(client[1]);
      });
    });
  }

  displayRoute() {
    return this.router.url === "/layout/dashboard/table-client";
  }
}
