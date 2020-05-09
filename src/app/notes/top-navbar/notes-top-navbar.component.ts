import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TooltipPosition } from '@angular/material/tooltip';

enum TopNavActionIdentifier {
  CREATE_NOTE,
  RETURN_HOME,
}

type ShouldDisplay = () => boolean;

interface TopNavAction {
  identifier: TopNavActionIdentifier;
  ariaLabel: string;
  tooltip: string;
  materialIcon: string;
  shouldDisplay: ShouldDisplay;
}

@Component({
  selector: 'n-notes-top-navbar',
  templateUrl: './notes-top-navbar.component.html',
  styleUrls: ['./notes-top-navbar.component.scss'],
})
export class NotesTopNavbarComponent implements OnInit {
  toggleSidenav = new EventEmitter<void>();
  tooltipPosition: TooltipPosition = 'above';
  actions: TopNavAction[] = [
    {
      identifier: TopNavActionIdentifier.CREATE_NOTE,
      ariaLabel: 'Create a new note',
      tooltip: 'Create a new note',
      materialIcon: 'create',
      shouldDisplay: this.shouldDisplay,
    },
    {
      identifier: TopNavActionIdentifier.RETURN_HOME,
      ariaLabel: 'Return to notes',
      tooltip: 'Return to notes',
      materialIcon: 'house',
      shouldDisplay: this.shouldDisplay,
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  handleActionClicked(action: TopNavAction) {
    if (action.identifier === TopNavActionIdentifier.CREATE_NOTE) {
      return this.navigateToNewNote();
    } else if (action.identifier === TopNavActionIdentifier.RETURN_HOME) {
      return this.navigateToNotesHome();
    } else {
      throw Error(`Unsupported action: ${action.identifier}`);
    }
  }

  navigateToNewNote() {
    this.router.navigate(['new'], {
      relativeTo: this.route,
    });
  }

  navigateToNotesHome() {
    this.router.navigateByUrl('/notes');
  }

  shouldDisplay() {
    return true;
  }
}
