import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { take, tap, switchMap } from 'rxjs/operators';
import { from, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {}

  async ngOnInit() {
    interval(5 * 60_000)
      .pipe(
        tap(() => console.log('Broadcasting user change')),
        switchMap(() => this.auth.broadcastUserChanges())
      )
      .subscribe(() => {
        console.log('Broadcasted');
      });
  }
}
