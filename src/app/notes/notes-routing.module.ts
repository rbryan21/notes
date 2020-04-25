import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from './notes.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: ':id',
        loadChildren: () =>
          import('./note/note.module').then((m) => m.NoteModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
