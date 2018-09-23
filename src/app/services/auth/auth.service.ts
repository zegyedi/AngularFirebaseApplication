import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user: Observable<firebase.User>;

  constructor(private fireBaseAuth: AngularFireAuth, private route: Router) {
       this.user = fireBaseAuth.authState;

  }
  async SignedInGoogle() {
    try {
        await this.fireBaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
    then(() => this.route.navigateByUrl('chat'));
    } catch (error) {
      console.log(error);
    }
   /* return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fireBaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.route.navigateByUrl('chat');
      }).catch(err => console.log(err.message));
    });*/
  }

    isLoggedIn(): boolean {
      return !this.user == null;
      }
  logOut() {
    this.fireBaseAuth.auth.signOut().then(() =>
    this.route.navigateByUrl('login'));
  }

  async getUser()  {
     await this.user.subscribe(x => {
       return x;
     });
  }


}




