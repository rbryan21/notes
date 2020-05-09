import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Note } from 'src/app/shared/models/note.model';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'notes-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  loading = true;
  isExistingNote = false;

  note: Note;

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const user = this.authService.getCurrentUser();
      const params = this.route.snapshot.params;
      if (params.id) {
        const id = params.id;
        if (id === 'new') {
          this.note = {
            id: '',
            title: '',
            description: '',
            uid: user.uid,
          };
          console.log('New note detected: ', this.note);
          this.isExistingNote = false;
        } else {
          this.note = await this.notesService.retrieveNote(id).toPromise();
          console.log('Existing note detected: ', this.note);
          this.isExistingNote = true;
        }
      } else {
        throw Error('Expecting id param');
      }
    } finally {
      this.loading = false;
    }
  }

  async createNote(form: NgForm) {
    if (form.valid) {
      let noteAction$: Observable<Note>;
      if (this.isExistingNote) {
        noteAction$ = this.notesService.updateNote(this.note);
      } else {
        noteAction$ = this.notesService.createNote(this.note);
      }
      const updatedNote = await noteAction$.toPromise();
      console.log('Updated note: ', updatedNote);
      this.router.navigate(['../']);
    }
  }
}
