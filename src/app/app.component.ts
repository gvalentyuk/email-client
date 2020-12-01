import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.signedin$ = this.authService.singedin$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(response => {
        if(response.authenticated){
          this.router.navigateByUrl('inbox')
        }
    })
  }
}
