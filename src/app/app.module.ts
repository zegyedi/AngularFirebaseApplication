import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/main/app.component';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './components/modules/app-routing.module';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { ChannelComponent } from './components/channel/channel.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './services/auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ChannelComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    FormsModule

  ],

  providers: [
    AngularFireDatabase,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
