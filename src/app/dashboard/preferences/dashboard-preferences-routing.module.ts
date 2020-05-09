import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPreferencesComponent } from './dashboard-preferences.component';

const routes: Routes = [{ path: '', component: DashboardPreferencesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPreferencesRoutingModule { }
