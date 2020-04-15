import { Component } from "@angular/core";
  import { Chart } from "chart.js";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  breakpoint: any;
  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    this.breakpoint = window.innerWidth <= 1000 ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 1000 ? 1 : 2;
    for (var id in Chart.instances) {
      Chart.instances[id].resize();
    }
  }
}
