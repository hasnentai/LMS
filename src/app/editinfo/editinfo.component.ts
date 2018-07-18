import { FormControl, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-editinfo',
  templateUrl: './editinfo.component.html',
  styleUrls: ['./editinfo.component.css']
})
export class EditinfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Data(form: NgForm) {
    console.log(form.value);
  }
}
