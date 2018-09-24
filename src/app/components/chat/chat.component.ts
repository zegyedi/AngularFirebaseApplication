import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import * as firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

import { map } from 'rxjs/operators';
import { ChatUser } from '../../user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Messages } from '../../messages';
import { Observable } from 'rxjs';
import { equal } from 'assert';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: ChatUser;
  userContext: AngularFireList<ChatUser>;
  messageContext: AngularFireList<Messages>;

  messages: Observable<Messages[]>;

  testUser: Observable<ChatUser>;

  messageText = '';

  constructor(private auth: AuthService, private sec: DomSanitizer, private fireDb: AngularFireDatabase) {
    this.userContext = this.fireDb.list('/users');
    this.messageContext = this.fireDb.list('/messages');

   }
   alma: any;
  ngOnInit() {
     this.auth.user.pipe(
       map(data => new ChatUser(data.uid, data.displayName, data.email, data.photoURL)))
     .subscribe(user => {
        this.user =  user;
      //  this.userContext.push( this.user);
        console.log(this.user);
      });

      this.messages = this.messageContext.valueChanges();

  }

  sendMessage() {
    this.messageContext.push(new Messages(this.user.displayName, this.user.photo_source, this.messageText));
  }


  logOut() {
    this.auth.logOut();
  }



  getSercureURl(url: string) {
      return this.sec.bypassSecurityTrustUrl(url);
  }


}
