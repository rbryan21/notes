import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface DashboardAction {
  materialIcon: string;
  onClick: Function;
  ariaLabel: string;
  tooltipText?: string;
}

@Injectable()
export class DashboardService {
  private currentTitle = new ReplaySubject<string>(1);
  private currentActions = new ReplaySubject<DashboardAction[]>(1);

  currentTitle$ = this.currentTitle.asObservable();

  currentActions$ = this.currentActions.asObservable();

  constructor() {}

  updateCurrentTitle(title: string) {
    this.currentTitle.next(title);
  }

  updateCurrentActions(actions: DashboardAction[]) {
    this.currentActions.next(actions);
  }
}
