import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Note } from 'src/app/shared/models/note.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'notes-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  private user: User;

  constructor(
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  createNote() {
    this.notesService
      .createNote('Title', 'Description', this.user.uid)
      .subscribe((note: Note) => {
        console.log('Created note: ', note);
      });
  }
}
