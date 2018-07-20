import { ServerserviceService } from '../serverservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userToken = localStorage.getItem('userToken');
  constructor(private serverservice: ServerserviceService, private router: Router) { }
  ngOnInit() {
    if (this.userToken === null) {
      this.router.navigateByUrl('/Register');
    } else {
      this.router.navigateByUrl('/profilepage');
    }
  }
  data(form: NgForm) {
   const data = form.value;
   this.serverservice.postRegisterData(data).subscribe((response: any) => {
     localStorage.setItem('userToken', response.access_token);
     console.log(response);
     if (response.token) {
      localStorage.setItem('userToken', response);
      console.log(localStorage.getItem('userToken'));
      this.router.navigateByUrl('/home');
     } else {
       console.log('Error' + response);
     }
   });

  }
}
