import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { ChatUser } from '../../Models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Messages } from '../../Models/messages';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd, } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { trigger, state, transition, animate, style, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('myTrigger', [
    ])]
})
export class ChatComponent implements OnInit {
  user: ChatUser;
  userContext: AngularFireList<ChatUser>;
  messageContext: AngularFireList<Messages>;
  messages: Observable<Messages[]>;
  testUser: Observable<ChatUser>;
  messageText = '';
  searchText = '';
  selectedFiles: FileList;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  readonly pictureMessagesBasePath = 'pictureMessages/';

  constructor(private auth: AuthService,
    private sec: DomSanitizer,
    private fireDb: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private fireStorage: AngularFireStorage) {

    this.userContext = this.fireDb.list('/users');
    this.messageContext = this.fireDb.list('/messages');

    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadMessageData();
      }

    });
  }
  ngOnInit() {
    this.auth.user.pipe(
      map(data => new ChatUser(data.uid, data.displayName, data.email, data.photoURL)),
    )
      .subscribe(user => {
        this.user = user;
      });

  }
  loadMessageData() {
    this.messages = this.messageContext.valueChanges().pipe(
      map(items => items.filter(item => item.channelName === this.getSelectedChannelName())
      ));


  }
  handleFileInput(files: FileList) {
    this.selectedFiles = files;
  }

  getSelectedChannelName(): string {
    return this.activatedRoute.snapshot.paramMap.get('name').toLowerCase();
  }

  sendMessage() {

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // tslint:disable-next-line:prefer-const
      // let fileNames: string[] = [];
      //   from(this.selectedFiles).pipe(map(val => file Names.push(val.name))).subscribe();
      // Array.from(this.selectedFiles).forEach(file => { fileNames.push(file.name); });
      // call file upload
      this.fileUploadToFirebaseStorage().then((result) => {
        this.messageContext.push(
          new Messages(
            this.user.displayName,
            this.user.photo_source,
            this.messageText,
            this.getSelectedChannelName(),
            result
          ));

        // go back to start point
        this.uploadProgress = this.uploadProgress.pipe(map(x => x = 0));
        (<HTMLInputElement>document.getElementById('file')).value = '';
      },
        error => alert(error));
    } else {
      this.messageContext.push(
        new Messages(
          this.user.displayName,
          this.user.photo_source,
          this.messageText,
          this.getSelectedChannelName()));

    }

    this.messageText = '';
  }
  removeMessages() {
    // this.fireDb.list('messages', ref => ref.orderByChild('channelName').equalTo(this.getSelectedChannelName())).remove();
    const messageRef = this.fireDb.database.ref('messages');
    const mQuery = messageRef.orderByChild('channelName').equalTo(this.getSelectedChannelName());
    mQuery.on('value', function (snapshot) {
      snapshot.forEach(function (item) {
        messageRef.child(item.key).remove();
      });
    });

    mQuery.off('value');
  }

  async fileUploadToFirebaseStorage(): Promise<string> {
    /*  */
    const element = this.selectedFiles[0];
    this.ref = this.fireStorage.ref(this.pictureMessagesBasePath + element.name);
    this.task = this.ref.put(element);
    this.uploadProgress = this.task.percentageChanges();
    return this.task.then(snapshot => snapshot.ref.getDownloadURL());
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

  getSercureURl(url: string) {
    return this.sec.bypassSecurityTrustUrl(url);
  }
}
