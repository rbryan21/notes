import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from './notes.component';
import { NotesHomeComponent } from './home/notes-home.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: '',
        component: NotesHomeComponent,
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./note/note.module').then((m) => m.NoteModule),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
