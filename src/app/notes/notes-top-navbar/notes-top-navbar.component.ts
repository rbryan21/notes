import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'notes-notes-top-navbar',
  templateUrl: './notes-top-navbar.component.html',
  styleUrls: ['./notes-top-navbar.component.scss'],
})
export class NotesTopNavbarComponent implements OnInit {
  toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  navigateToNewNote() {
    this.router.navigate(['new'], {
      relativeTo: this.route,
    });
  }

  navigateToNotesHome() {
    this.router.navigateByUrl('/notes');
  }
}
