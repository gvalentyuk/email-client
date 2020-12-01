import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @Output() emailSubmit = new EventEmitter();
  emailForm: FormGroup;

  constructor(
    private authService: AuthService
  ) {
    this.emailForm = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.email, Validators.required]),
      from: new FormControl(
        { value: `${authService.username}@angular-email.com`, disabled: true },
        [Validators.required]
      ),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if(this.emailForm.invalid){
      return;
    }  

    this.emailSubmit.emit(this.emailForm.getRawValue());
  }
}
