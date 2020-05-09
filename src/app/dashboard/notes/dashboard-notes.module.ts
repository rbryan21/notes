import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardNotesRoutingModule } from './dashboard-notes-routing.module';

import { DashboardNotesHomeComponent } from './home/dashboard-notes-home.component';
import { DashboardNotesNoteComponent } from './note/dashboard-notes-note.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardNotesHomeComponent, DashboardNotesNoteComponent],
  imports: [CommonModule, SharedModule, DashboardNotesRoutingModule],
})
export class DashboardNotesModule {}
