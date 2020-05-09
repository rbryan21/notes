import { NgModule } from '@angular/core';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { SharedModule } from '../shared/shared.module';
import { NotesTopNavbarComponent } from './top-navbar/notes-top-navbar.component';
import { NotesHomeComponent } from './home/notes-home.component';

@NgModule({
  declarations: [NotesComponent, NotesTopNavbarComponent, NotesHomeComponent],
  imports: [SharedModule, NotesRoutingModule],
})
export class NotesModule {}
