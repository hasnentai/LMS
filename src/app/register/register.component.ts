import { ServerserviceService } from '../serverservice.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  minDate = { year: 1990, month: 1, day: 1 };
  maxDate = { year: 2010, month: 12, day: 31 };
  editResponse;
  userToken = localStorage.getItem('userToken');
  passwordValid = true;
  constructor(private serverservice: ServerserviceService, private router: Router, public el: ElementRef, public renderer: Renderer2) { }
  ngOnInit() {
    if (this.userToken === null) {
      this.router.navigateByUrl('/Register');
    } else {
      this.router.navigateByUrl('/profilepage');
    }
  }

  validatepassword(repass, pass) {
    console.log(repass, pass);
    if (repass === pass) {
      this.passwordValid = true;
    } else {
      this.passwordValid = false;
    }
    console.log(this.passwordValid);
  }
  data(form: NgForm) {
    const messageContianer = this.el.nativeElement.getElementsByClassName('mymessage')[0];
    if (!navigator.onLine) {
      this.renderer.addClass(messageContianer, 'message-open');
      this.renderer.removeClass(messageContianer, 'message-close');
      this.editResponse = 'Seems Your Network Connection is Down! Please try again';
      setTimeout(() => {
        this.renderer.removeClass(messageContianer, 'message-open');
        this.renderer.addClass(messageContianer, 'message-close');
        console.log('inside the down');
      }, 2000);
    } else {
      this.renderer.addClass(messageContianer, 'message-open');
      this.renderer.removeClass(messageContianer, 'message-close');
      if (this.passwordValid) {
        const data = form.value;
        console.log(form.value.dob);
        this.serverservice.postRegisterData(data).subscribe((response: any) => {
          if (response.token) {
            localStorage.setItem('userToken', response.token);
            console.log(localStorage.getItem('userToken'));
            this.router.navigateByUrl('/home');
          } else {
            console.log('Error' + response);
          }
          this.editResponse = response.message;
          setTimeout(() => {
            this.renderer.removeClass(messageContianer, 'message-open');
            this.renderer.addClass(messageContianer, 'message-close');
          }, 2000);
        });
      }
    }
  }
}
export class NgbdDatepickerPopup {
  model;
}
