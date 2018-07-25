import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
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
  editResponse ;
  // tslint:disable-next-line:max-line-length
  constructor(private serverservice: ServerserviceService, private router: Router, public activatedRouter: ActivatedRoute, public el: ElementRef, public renderer: Renderer2) { }

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
    this.serverservice.postLoginData(data).subscribe((response: any) => {
      console.log(response);
     if (response.token) {
      localStorage.setItem('userToken', response.token);
      console.log(localStorage.getItem('userToken'));
       this.router.navigateByUrl('/profilepage');
     } else {
      this.renderer.addClass(messageContianer, 'message-open');
      this.renderer.removeClass(messageContianer, 'message-close');
       console.log('Error' + response.error);
       this.editResponse = 'Seems Your Network Connection is Down! Please try again';
       setTimeout(() => {
         this.renderer.removeClass(messageContianer, 'message-open');
         this.renderer.addClass(messageContianer, 'message-close');
         console.log('inside the down');
       }, 2000);
     }
     this.editResponse = response.message;
     setTimeout(() => {
      this.renderer.removeClass(messageContianer, 'message-open');
    this.renderer.addClass(messageContianer, 'message-close');
    }, 2000);
    } );
  }
  }

}
