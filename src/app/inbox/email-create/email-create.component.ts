import { Component, OnInit, } from '@angular/core';
import { EmailService } from '../email.service';
import { Email } from '../email';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {}

  onSubmit(email: Email) {
    this.emailService.postEmail(email).subscribe(() => {
      this.showModal = false
    })

  }
}
