import { Component, OnInit } from '@angular/core';
import { ChatUser } from '../../Models/user';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: ChatUser = null;

  constructor(private auth: AuthService,
              private sec: DomSanitizer) { }

  ngOnInit() {
    this.auth.user.pipe(
      map(data => new ChatUser(data.uid, data.displayName, data.email, data.photoURL)),
      )
      .subscribe(user => {
        this.user = user;
      });
  }

  getSercureURl(url: string) {
    return this.sec.bypassSecurityTrustUrl(url);
  }

  logOut() {
    this.auth.user.subscribe().unsubscribe();
    this.auth.logOut();
    this.user = null;
  }

}
