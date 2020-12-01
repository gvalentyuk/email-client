import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface SignUpCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignedIn {
  authenticated: boolean;
  username: string;
}

interface SignInCredentials {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  singedin$ = new BehaviorSubject(false);
  username = '';

  constructor(private http: HttpClient) {}

  signup(credentials: SignUpCredentials) {
    return this.http
      .post<{ username: string }>(
        'https://api.angular-email.com/auth/signup',
        {
          username: credentials.username,

          password: credentials.password,

          passwordConfirmation: credentials.confirmPassword,
        },
        { withCredentials: true }
      )
      .pipe(
        tap(({username}) => {
          this.singedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedIn>('https://api.angular-email.com/auth/signedin', {
        withCredentials: true,
      })
      .pipe(
        tap(({ authenticated, username }) => {
          this.singedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http
      .post('https://api.angular-email.com/auth/signout', {}, {withCredentials: true})
      .pipe(
        tap(() => {
          this.singedin$.next(false);
          this.username = '';
        })
      );
  }

  signin(credentials: SignInCredentials) {
      return this.http.post<{username: string}>('https://api.angular-email.com/auth/signin', credentials, {
        withCredentials: true
      }).pipe(
        tap(({username}) => {
          this.singedin$.next(true)
          this.username = username;
        })
      )
  }
}
