import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public activatedRouter: ActivatedRoute) {}
  ngOnInit() {
    // if () {
    //   console.log('onloginpage');
    // } else {
    //   console.log(this.router.isActive('/login', false));
    // }
  }
}
