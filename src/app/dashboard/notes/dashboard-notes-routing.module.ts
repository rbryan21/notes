import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardNotesHomeComponent } from './home/dashboard-notes-home.component';
import { DashboardNotesNoteComponent } from './note/dashboard-notes-note.component';

const routes: Routes = [
  { path: 'home', component: DashboardNotesHomeComponent },
  { path: 'note/:id', component: DashboardNotesNoteComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardNotesRoutingModule {}
