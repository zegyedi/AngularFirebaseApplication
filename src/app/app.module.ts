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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    FormsModule

  ],

  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
