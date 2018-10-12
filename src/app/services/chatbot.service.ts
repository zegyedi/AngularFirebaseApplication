import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // readonly baseUrl = 'https://dialogflow.googleapis.com/v2/projects/{angularchatapplication-fdf86}/agent';
  private baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';

  private readonly token = environment.dialogflow.angularBot;

  constructor(private httpClient: HttpClient, auth: AuthService) { }

  public talkChatBot(query: string): Observable<Object> {
    const data = {
      query: query,
      lang: 'en',
      sessionId: '1235'
    };
    return this.httpClient.post(this.baseURL, data, this.getHeaders());
  }
  public getHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.token);
    return {
      headers: headers
    };
  }

}
