import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import * as firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

import { map } from 'rxjs/operators';
import { ChatUser } from '../../user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: ChatUser;
  constructor(private auth: AuthService, private sec: DomSanitizer) { }

  ngOnInit() {
     this.auth.user.pipe(map(data => new ChatUser(data.uid, data.displayName, data.email, data.photoURL)))
     .subscribe(user => {
        this.user =  user;
        console.log(this.user);
      });
    /*
     this.user.displayName
    this.user.email
    this.user.photoURL
    this.user.getIdToken();
    */
  }
  logOut() {
    this.auth.logOut();
  }

  getSercureURl(url: string) {
      return this.sec.bypassSecurityTrustUrl(url);
  }


}
