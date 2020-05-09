import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPreferencesRoutingModule } from './dashboard-preferences-routing.module';
import { DashboardPreferencesComponent } from './dashboard-preferences.component';


@NgModule({
  declarations: [DashboardPreferencesComponent],
  imports: [
    CommonModule,
    DashboardPreferencesRoutingModule
  ]
})
export class DashboardPreferencesModule { }
