import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { SharedModule } from '../shared/shared.module';
import { NotesTopNavbarComponent } from './notes-top-navbar/notes-top-navbar.component';
import { NotesHomeComponent } from './notes-home/notes-home.component';

@NgModule({
  declarations: [NotesComponent, NotesTopNavbarComponent, NotesHomeComponent],
  imports: [SharedModule, NotesRoutingModule],
})
export class NotesModule {}
