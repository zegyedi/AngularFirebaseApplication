import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map, filter } from 'rxjs/operators';
import { ChatUser } from '../../Models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Messages } from '../../Models/messages';
import { Observable } from 'rxjs';
import { Channel } from '../../models/channel';
import { ActivatedRoute } from '@angular/router';

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

  channels: Channel[] = [{ name: 'main' }, { name: 'test2' }, { name: 'test3' }];

  messageText = '';
  searchText = '';

  constructor(private auth: AuthService,
    private sec: DomSanitizer,
    private fireDb: AngularFireDatabase,
    private route: ActivatedRoute) {

    this.userContext = this.fireDb.list('/users');
    this.messageContext = this.fireDb.list('/messages');
  }

  ngOnInit() {
    this.auth.user.pipe(
      map(data => new ChatUser(data.uid, data.displayName, data.email, data.photoURL)),
      )
      .subscribe(user => {
        this.user = user;
        //  this.userContext.push( this.user);
        console.log(this.user);
      });

    this.messages = this.messageContext.valueChanges().pipe(
      map(items => items.filter(item => item.channelName.indexOf(this.getRoute()) > -1)
      ));


  }

  getRoute(): string {
    return  this.route.snapshot.paramMap.get('name');
  }

  sendMessage() {
    this.messageContext.push(new Messages(this.user.displayName, this.user.photo_source, this.messageText, this.getRoute()));
    this.messageText = '';
  }

  searchInMessages() {
    this.messages = this.messages.pipe(
      map(items => items.filter(item => item.text.indexOf(this.searchText) > -1)
      ));
  }

  searchClear() {
    this.searchText = '';
    this.searchInMessages();
  }

  logOut() {
    this.auth.user.subscribe().unsubscribe();
    this.auth.logOut();
  }

  getSercureURl(url: string) {
    return this.sec.bypassSecurityTrustUrl(url);
  }
}
