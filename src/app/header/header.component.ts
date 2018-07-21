import { Component, OnInit , ElementRef, Renderer2 } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { HostListener } from '@angular/core';
import { ServerserviceService } from '../serverservice.service';
import { element } from 'protractor';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        transform: 'translateX(-100%)',
      })),
      state('active',   style({
        transform: 'translateX(0px)',

      })),
      transition('inactive => active', animate('300ms ease-out')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class HeaderComponent  implements OnInit {

  public anistate = 'inactive';
  content: any;
  selectedIndex = 0;
  userToken = localStorage.getItem('userToken');
  userName = '';
  email = '';
  login;

  constructor(public el: ElementRef, public renderer: Renderer2, public serverservice: ServerserviceService) {}

  myitem = [
    {
      menu : 'Home',
      link : '/home'
    },
    {
      menu : 'DashBoard',
      link : '/profilepage'
    },
    {
      menu : 'Courses Taken',
      link : '/gmail'
    },
    {
      menu : 'Reports',
      link : '/google'
    },
    {
      menu : 'Edit Info',
      link : '/edit'
    },
  ];

  ngOnInit() {
    if (localStorage.getItem('userToken') !== null) {
      this.login = true;
    } else {
      this.login = false;
    }
    console.log(this.login);
    this.serverservice.getEditData().subscribe((response) => {
      // for (const test of response) {

      // }
    this.userName = response[0].userInfo[0].fname + ' ' + response[0].userInfo[0].lname;
     this.email = response[0].userInfo[0].email;
     console.log(response[1].course);
    });
  }

  select(index: number) {
      this.selectedIndex = index;
  }
  logout() {
      localStorage.removeItem('userToken');
  }

  toggleState() {
    this.anistate = this.anistate === 'active' ? 'inactive' : 'active';
  }
}
