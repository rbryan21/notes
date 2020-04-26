import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NoteComponent],
  imports: [SharedModule, NoteRoutingModule],
})
export class NoteModule {}
