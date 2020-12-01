import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  submit() {

    if(this.authForm.invalid){
      return;
    }

    this.authService.signin(this.authForm.value).subscribe( {
      next: () => {
          this.router.navigateByUrl('inbox')
      },
      error: (err) => {
          this.authForm.setErrors({credentials: true})
      }
    })
  }

}
