import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerserviceService } from '../serverservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userToken = localStorage.getItem('userToken');
  constructor(private serverservice: ServerserviceService, private router: Router, public activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    if (this.userToken === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  data(form: NgForm) {
    console.log(form.value);
    const data = form.value;
    this.serverservice.postLoginData(data).subscribe((response: any) => {
      console.log(response);
     if (response.token) {
      localStorage.setItem('userToken', response.token);
      console.log(localStorage.getItem('userToken'));
       this.router.navigateByUrl('/profilepage');
     } else {
       console.log('Error' + response.error);
     }
    } );
  }

}
