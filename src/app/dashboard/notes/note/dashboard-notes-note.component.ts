import { Component, OnInit } from '@angular/core';
import {
  DashboardAction,
  DashboardService,
} from '../../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Note } from 'src/app/shared/models/note.model';
import { NotesService } from 'src/app/services/notes/notes.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'n-dashboard-notes-note',
  templateUrl: './dashboard-notes-note.component.html',
  styleUrls: ['./dashboard-notes-note.component.scss'],
})
export class DashboardNotesNoteComponent implements OnInit {
  actions: DashboardAction[];
  loading = true;
  isExistingNote = false;
  errorLoadingNote = false;
  note: Note;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notesService: NotesService
  ) {
    this.handleHomeClicked = this.handleHomeClicked.bind(this);
    this.actions = [
      {
        ariaLabel: 'Return to notes',
        tooltipText: 'Return to note',
        materialIcon: 'home',
        onClick: this.handleHomeClicked.bind(this),
      },
    ];
  }

  async ngOnInit(): Promise<void> {
    this.dashboardService.updateCurrentTitle('Note');
    this.dashboardService.updateCurrentActions(this.actions);

    try {
      const user = await this.authService.user$
        .pipe(
          filter((user: User) => !!user),
          take(1)
        )
        .toPromise();
      const params = this.activatedRoute.snapshot.params;

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
    } catch (e) {
      console.error(`Failed to load existing note: `, e);
      this.errorLoadingNote = true;
    } finally {
      this.loading = false;
    }
  }

  handleHomeClicked() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
      this.handleHomeClicked();
    }
  }
}
