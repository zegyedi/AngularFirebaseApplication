import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // readonly baseUrl = 'https://dialogflow.googleapis.com/v2/projects/{angularchatapplication-fdf86}/agent';
  private baseURL = 'https://api.dialogflow.com/v1/query?';

  private readonly token = environment.dialogflow.clientId;

  constructor(private httpClient: HttpClient) {}

  public talk(query: string): Observable<Object> {
    const data = {
      query: query,
      lang: 'en',
      sessionId: '1235'
    };

    return this.httpClient.jsonp(
      this.baseURL + 'query=test&lang=en&sessionId=123',
      'callback'
    );
  }
  public getHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/jsonp')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      .set('Authorization', 'Bearer ' + this.token);
    return {
      headers: headers
    };
  }
}
