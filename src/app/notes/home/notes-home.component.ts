import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { NotesService } from 'src/app/services/notes/notes.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'firebase';

@Component({
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.scss'],
})
export class NotesHomeComponent implements OnInit {
  notesEmpty = false;

  notes$ = this.authService.user$.pipe(
    switchMap((user: User) => this.notesService.retrieveNotesForUser(user.uid)),
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

  ngOnInit(): void {}
}
