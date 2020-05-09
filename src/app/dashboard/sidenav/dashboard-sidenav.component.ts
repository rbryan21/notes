import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface NotesRoute {
  title: string;
  relativePath: string;
  materialIcon: string;
}

@Component({
  selector: 'n-dashboard-sidenav',
  template: `
    <mat-list>
      <ng-container *ngFor="let route of routes">
        <mat-list-item (click)="navigateToRelativePath(route)">
          <mat-icon>{{ route.materialIcon }}</mat-icon>
          <span class="small-padding-left">{{ route.title }}</span>
        </mat-list-item>
      </ng-container>
    </mat-list>
  `,
  styleUrls: ['./dashboard-sidenav.component.scss'],
})
export class DashboardSidenavComponent implements OnInit {
  routes: NotesRoute[] = [
    {
      title: 'Notes',
      relativePath: 'notes',
      materialIcon: 'description',
    },
    {
      title: 'Preferences',
      relativePath: 'preferences',
      materialIcon: 'build',
    },
  ];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  navigateToRelativePath(route: NotesRoute) {
    this.router.navigate([route.relativePath], {
      relativeTo: this.activatedRoute,
    });
  }
}
