import { Component, OnInit } from '@angular/core';
import {
  DashboardAction,
  DashboardService,
} from '../../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes/notes.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { switchMap, tap, filter, catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { of } from 'rxjs';
import { Note } from 'src/app/shared/models/note.model';

@Component({
  selector: 'n-dashboard-notes-home',
  templateUrl: './dashboard-notes-home.component.html',
  styleUrls: ['./dashboard-notes-home.component.scss'],
})
export class DashboardNotesHomeComponent implements OnInit {
  actions: DashboardAction[];
  notesEmpty = false;
  loading = true;

  notes$ = this.authService.user$.pipe(
    // filter((user) => !!user),
    switchMap((user: User) => this.notesService.retrieveNotesForUser(user.uid)),
    tap((notes) => {
      console.log(`Retrieved ${notes.length} notes: ${JSON.stringify(notes)}`);
      if (notes.length === 0) {
        this.notesEmpty = true;
      } else {
        this.notesEmpty = false;
      }
      this.loading = false;
    }),
    catchError((e) => {
      console.error(e);
      this.loading = false;
      return of([]);
    })
  );

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService,
    private authService: AuthService
  ) {
    this.handleNewNoteClicked = this.handleNewNoteClicked.bind(this);
    this.actions = [
      {
        ariaLabel: 'Create a new note',
        tooltipText: 'Create a new note',
        materialIcon: 'create',
        onClick: this.handleNewNoteClicked.bind(this),
      },
    ];
  }
  ngOnInit(): void {
    this.dashboardService.updateCurrentTitle('Notes');
    this.dashboardService.updateCurrentActions(this.actions);
  }

  handleNewNoteClicked() {
    this.router.navigate(['../note/new'], { relativeTo: this.activatedRoute });
  }

  handleNoteSelected(note: Note) {
    this.router.navigate([`../note/${note.id}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
