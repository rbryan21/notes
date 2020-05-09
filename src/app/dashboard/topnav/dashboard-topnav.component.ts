import { Component, OnInit } from '@angular/core';
import {
  DashboardService,
  DashboardAction,
} from '../services/dashboard.service';

@Component({
  selector: 'n-dashboard-topnav',
  template: `
    <mat-toolbar color="secondary">
      <mat-toolbar-row>
        <span>{{ currentTitle | async }}</span>
        <span class="notes-spacer"></span>
        <div id="notes-toolbar-actions-container">
          <ng-container *ngFor="let action of currentActions | async">
            <button
              mat-icon-button
              [attr.aria-label]="action.ariaLabel"
              (click)="handleActionClicked(action)"
              [matTooltipPosition]="'above'"
              [matTooltip]="action.tooltipText"
            >
              <mat-icon>{{ action.materialIcon }}</mat-icon>
            </button>
          </ng-container>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./dashboard-topnav.component.scss'],
})
export class DashboardTopnavComponent implements OnInit {
  currentTitle = this.dashboardSerivce.currentTitle$;
  currentActions = this.dashboardSerivce.currentActions$;

  constructor(private dashboardSerivce: DashboardService) {}

  ngOnInit(): void {}

  handleActionClicked(action: DashboardAction) {
    action.onClick();
  }
}
