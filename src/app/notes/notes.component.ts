import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes/notes.service';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'notes-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
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

  retrieveNotes() {
    this.notesService
      .retrieveNotesForUser(this.user.uid)
      .subscribe((result) => {
        console.log('Results = ', result);
      });
  }
}
