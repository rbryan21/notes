import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Note } from 'src/app/shared/models/note.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'notes-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  private user: User;
  loading = true;

  note: Note;

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const params = this.route.snapshot.params;
      if (params.id) {
        const id = params.id;
        if (id === 'new') {
          this.note = {
            id: '',
            title: '',
            description: '',
            uid: '',
          };
          console.log('New note detected: ', this.note);
        } else {
          this.note = await this.notesService.retrieveNote(id).toPromise();
          console.log('Existing note detected: ', this.note);
        }
      } else {
        throw Error('Expecting id param');
      }
    } finally {
      this.loading = false;
    }
  }

  createNote(form: NgForm) {
    // this.notesService
    //   .createNote('Title', 'Description', this.user.uid)
    //   .subscribe((note: Note) => {
    //     console.log('Created note: ', note);
    //   });
  }
}
