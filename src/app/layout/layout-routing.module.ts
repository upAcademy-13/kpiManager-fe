import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { CreateUserComponent } from "./createUser/createUser.component";
import { PermissionsCOOGuard } from "../core/guards/permissionsCOO.guard";
import { LayoutFormComponent } from "./layout-form/layout-form.component";
import { ManagersClientManagementComponent } from './managers-client-management/managers-client-management.component';
import { PermissionStatisticsGuard } from "../core/guards/permission-statistics.guard";
import { PermissionCreateClientGuard } from '../core/guards/permission-create-client.guard';


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "create",
        component: CreateUserComponent,
        canActivate: [PermissionsCOOGuard],
      },
      {
        path: "layoutform",
        component: LayoutFormComponent,
      },
      {
        path: "statistics",
        component: StatisticsComponent,
        canActivate:[PermissionStatisticsGuard],
      },
      {
        path: "clients&managers",
        component: ManagersClientManagementComponent,
        canActivate: [PermissionCreateClientGuard]
      },
      /*  {
        path: "",
        redirectTo: "layoutform",
        pathMatch: "full"
      }, */
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
