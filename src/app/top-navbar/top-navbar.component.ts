import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'notes-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  isUserLoggedIn;
  private isUserLoggedInSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserLoggedInSubscription = this.authService
      .isUserLoggedIn()
      .subscribe((value: boolean) => {
        this.isUserLoggedIn = value;
      });
  }

  ngOnDestroy(): void {
    if (this.isUserLoggedInSubscription) {
      this.isUserLoggedInSubscription.unsubscribe();
    }
  }

  handleExitClicked() {
    this.authService.signOut();
  }

  handleLoginClicked() {
    this.authService.googleSignin().subscribe(() => {
      console.log('User signed on');
    });
  }

  handleSupClicked() {
    this.authService.getCurrentUser().then((value) => {
      console.log(value);
    });
  }
}
