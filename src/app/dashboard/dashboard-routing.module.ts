import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'notes',
        loadChildren: () =>
          import('./notes/dashboard-notes.module').then(
            (m) => m.DashboardNotesModule
          ),
      },
      {
        path: 'preferences',
        loadChildren: () =>
          import('./preferences/dashboard-preferences.module').then(
            (m) => m.DashboardPreferencesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
