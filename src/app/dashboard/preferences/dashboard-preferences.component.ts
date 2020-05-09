import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'n-dashboard-preferences',
  templateUrl: './dashboard-preferences.component.html',
  styleUrls: ['./dashboard-preferences.component.scss'],
})
export class DashboardPreferencesComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.updateCurrentTitle('Preferences');
    this.dashboardService.updateCurrentActions([]);
  }
}
