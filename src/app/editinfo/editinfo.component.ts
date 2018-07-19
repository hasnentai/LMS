import { FormControl, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerserviceService } from '../serverservice.service';


@Component({
  selector: 'app-editinfo',
  templateUrl: './editinfo.component.html',
  styleUrls: ['./editinfo.component.css']
})
export class EditinfoComponent implements OnInit {
  userToken = localStorage.getItem('userToken');
  editInfo;
    fname = '';
    lname = '';
    course = '';
    email = '';
    state = '';
    city = '';
    college = '';
    sem = '';
    dob = '';
    token = '';
  constructor(private router: Router, public serverservice: ServerserviceService) { }

  ngOnInit() {
    if (this.userToken === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.serverservice.getEditData().subscribe((response) => {
        this.editInfo = response;
       console.log(this.editInfo[0].college);
       this.fname = this.editInfo[0].fname;
       this.lname = this.editInfo[0].lname;
       this.email = this.editInfo[0].email;
       this.state = this.editInfo[0].state;
       this.city = this.editInfo[0].city;
       this.college = this.editInfo[0].college;
       this.sem = this.editInfo[0].sem;
       this.dob = this.editInfo[0].dob;
       this.course = this.editInfo[0].course;
       this.token =  localStorage.getItem('userToken');
      //  for ( const user of response) {

      //  }
      });
     // console.log(this.editInfo);
    }
    }
  Data(form: NgForm) {
    console.log(form.value);
    this.serverservice.putEditData(form.value).subscribe((response) => {
      console.log(response);
    } );
  }
}
