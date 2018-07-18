import { ServerserviceService } from '../serverservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private serverservice: ServerserviceService) { }

  ngOnInit() {
  }
  data(form: NgForm) {
   const data = form.value;
   this.serverservice.postRegisterData(data).subscribe((response: any) => {
     localStorage.setItem('userToken', response.access_token);
     console.log(response);
   });

  }
}
