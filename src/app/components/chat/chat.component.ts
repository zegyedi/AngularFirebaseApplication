import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { ChatUser } from '../../Models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Messages } from '../../Models/messages';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import {
  trigger,
  state,
  transition,
  animate,
  style,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { ChatbotService } from 'src/app/services/chatbot/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('myTrigger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(
              '100ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transition: 'TranslateY(-100px)' })
              )
            )
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class ChatComponent implements OnInit {
  user: ChatUser;
  userContext: AngularFireList<ChatUser>;
  messageContext: AngularFireList<Messages>;
  messages: Observable<Messages[]>;
  messageText = '';
  searchText = '';
  selectedFiles: FileList;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  readonly pictureMessagesBasePath = 'pictureMessages/';
  itemsLength: number;

  constructor(
    private auth: AuthService,
    private sec: DomSanitizer,
    private fireDb: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private fireStorage: AngularFireStorage,
    private chatbotService: ChatbotService
  ) {
    this.userContext = this.fireDb.list('/users');
    this.messageContext = this.fireDb.list('/messages');

    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadMessageData();
      }
    });
  }
  ngOnInit() {
    this.auth.user
      .pipe(
        map(
          data =>
            new ChatUser(data.uid, data.displayName, data.email, data.photoURL)
        )
      )
      .subscribe(user => {
        this.user = user;
      });
  }
  loadMessageData() {
    this.messages = this.messageContext.valueChanges().pipe(
      map(items => {
        const filteredItem = items.filter(
          item => item.roomName === this.getSelectedRoomName()
        );
        this.itemsLength = filteredItem.length;
        return filteredItem;
      })
    );
  }
  handleFileInput(files: FileList) {
    this.selectedFiles = files;
  }

  getSelectedRoomName(): string {
    return this.activatedRoute.snapshot.paramMap.get('name').toLowerCase();
  }

  sendMessage() {
    let newMessages = new Messages(
      this.user.displayName,
      this.user.photo_source,
      this.messageText,
      this.getSelectedRoomName()
    );

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // tslint:disable-next-line:prefer-const
      // let fileNames: string[] = [];
      //   from(this.selectedFiles).pipe(map(val => file Names.push(val.name))).subscribe();
      // Array.from(this.selectedFiles).forEach(file => { fileNames.push(file.name); });
      // call file upload
      this.fileUploadToFirebaseStorage().then(
        result => {
          newMessages.fileDownloadUrl = result;
          this.messageContext.push(newMessages);
          // go back to start point
          this.uploadProgress = this.uploadProgress.pipe(map(x => (x = 0)));
          (<HTMLInputElement>document.getElementById('file')).value = '';
        },
        error => alert(error)
      );
    } else {
      this.messageContext.push(newMessages);
    }

    // chatbotTalk
    this.chatbotService.talk(this.messageText).subscribe(res => {
      const speech = res['result'].fulfillment.speech;
      newMessages = new Messages(
        'Chatbot',
        './img/robotIcon.png',
        speech,
        this.getSelectedRoomName()
      );
      this.messageContext.push(newMessages);
    });

    /*   newMessages = new Messages(
      'Chatbot',
      './public/img/robotIcon.png',
      'speech',
      this.getSelectedRoomName()
    );
    this.messageContext.push(newMessages); */

    this.messageText = '';
  }
  /*  remove message from database by selected room*/
  deleteAllMessages() {
    const messageRef = this.fireDb.database.ref('messages');
    const mQuery = messageRef
      .orderByChild('roomName')
      .equalTo(this.getSelectedRoomName());

    mQuery.on('value', function(snapshot) {
      snapshot.forEach(function(item) {
        messageRef.child(item.key).remove();
      });
    });

    mQuery.off('value');
  }
  /*
   store picture to firebase sotage and return download url path
    */
  async fileUploadToFirebaseStorage(): Promise<string> {
    const element = this.selectedFiles[0];
    this.ref = this.fireStorage.ref(
      this.pictureMessagesBasePath + element.name
    );
    this.task = this.ref.put(element);
    this.uploadProgress = this.task.percentageChanges();
    return this.task.then(snapshot => snapshot.ref.getDownloadURL());
  }

  // message searching feature
  searchInMessages() {
    this.messages = this.messages.pipe(
      map(items =>
        items.filter(item => item.text.indexOf(this.searchText) > -1)
      )
    );
  }

  searchClear() {
    this.searchText = '';
    this.searchInMessages();
  }

  getSercureURl(url: string) {
    return this.sec.bypassSecurityTrustUrl(url);
  }
}
