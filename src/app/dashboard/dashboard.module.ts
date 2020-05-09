import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { SharedModule } from '../shared/shared.module';
import { DashboardSidenavComponent } from './sidenav/dashboard-sidenav.component';
import { DashboardTopnavComponent } from './topnav/dashboard-topnav.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSidenavComponent,
    DashboardTopnavComponent,
  ],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  providers: [DashboardService],
})
export class DashboardModule {}
