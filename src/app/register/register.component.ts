import { ServerserviceService } from '../serverservice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  minDate = {year: 1990, month: 1, day: 1};
  maxDate = {year: 2010, month: 12, day: 31};
  userToken = localStorage.getItem('userToken');
  passwordValid = true;
  constructor(private serverservice: ServerserviceService, private router: Router) { }
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
    console.log(this.passwordValid );
  }
  data(form: NgForm) {
   if ( this.passwordValid)  {
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
    });
   }
  }
}
export class NgbdDatepickerPopup {
  model;
}
