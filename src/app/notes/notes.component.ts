import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes/notes.service';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  showFiller = false;
  notesEmpty = false;
  private user: User;

  notes$ = this.authService.user$.pipe(
    tap((user) => (this.user = user)),
    switchMap(() => this.notesService.retrieveNotesForUser(this.user.uid)),
    tap((notes) => {
      if (notes.length === 0) {
        this.notesEmpty = true;
      } else {
        this.notesEmpty = false;
      }
    })
  );

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
