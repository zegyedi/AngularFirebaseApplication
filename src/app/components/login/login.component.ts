import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: Observable<any[]>;
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  doGoogleLogin() {
    this.auth.googleAuth();
  }
  doFacebookLogin() {
    this.auth.facebookAuth();
  }
}
