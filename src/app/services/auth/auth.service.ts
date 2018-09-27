import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private fireBaseAuth: AngularFireAuth, private route: Router) {
    this.user = fireBaseAuth.authState;

  }
  async googleAuth() {
    try {
      await this.fireBaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
        then(() => {
          this.route.navigateByUrl('chat/main');
        });
    } catch (error) {
      console.log(error);
    }
  }
  async facebookAuth() {
    try {
      await this.fireBaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).
        then(() => {
          this.route.navigateByUrl('chat/main');
        });
    } catch (error) {
      console.log(error);
    }
  }
  isLoggedIn(): boolean {
    return !this.user == null;
  }
  logOut() {
    this.fireBaseAuth.auth.signOut().then(() =>
      this.route.navigateByUrl('login'));
  }

}







