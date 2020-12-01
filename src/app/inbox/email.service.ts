import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Email } from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  fetchEmails() {
    return this.http.get<EmailSummary[]>(
      'https://api.angular-email.com/emails',
      {
        withCredentials: true,
      }
    );
  }

  fetchEmail(id: string) {
    return this.http.get<Email>('https://api.angular-email.com/emails/' + id, {
      withCredentials: true,
    });
  }

  postEmail(email: Email) {
    return this.http.post('https://api.angular-email.com/emails', email, {
      withCredentials: true,
    });
  }
}
