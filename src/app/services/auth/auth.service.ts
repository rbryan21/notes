import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import {
  Observable,
  of,
  Subject,
  BehaviorSubject,
  from,
  interval,
  Subscription,
  ReplaySubject,
} from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject(null);
  private initialUserBroadcastComplete = new ReplaySubject<void>();
  initialUserBroadcastComplete$: Observable<
    void
  > = this.initialUserBroadcastComplete.asObservable();
  user$: Observable<User> = this.userSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.broadcastUserChanges().subscribe(() => {
      console.log('Initiated user broadcast complete');
      this.initialUserBroadcastComplete.next();
    });
  }

  broadcastUserChanges(): Observable<void> {
    return from(this.afAuth.user).pipe(
      map((user: User) => {
        let currentUser;
        if (user) {
          console.log('Current user present');
          currentUser = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          console.log('No current user present');
          currentUser = null;
        }
        this.userSubject.next(user);
      })
    );
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.initialUserBroadcastComplete.asObservable().pipe(
      map(() => {
        return !!this.userSubject.value;
      })
    );
  }

  googleSignin(): Observable<void> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      switchMap((credential) => this.updateUserData(credential.user))
    );
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.userSubject.next(null);
    return this.router.navigate(['/']);
  }

  private updateUserData({
    uid,
    email,
    displayName,
    photoURL,
  }: User): Observable<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    const updatedUser: User = {
      uid,
      email,
      displayName,
      photoURL,
    };

    return from(userRef.set(updatedUser, { merge: true })).pipe(
      tap(() => {
        console.log('User updated: ', updatedUser);
        this.userSubject.next(updatedUser);
      })
    );
  }
}
