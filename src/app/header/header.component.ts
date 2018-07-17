import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        zIndex: '9999',
        transform: 'translateX(-100%)',
      })),
      state('active',   style({
        zIndex: '9999',
        transform: 'translateX(0px)',

      })),
      transition('inactive => active', animate('600ms ease-in')),
      transition('active => inactive', animate('600ms ease-out'))
    ])
  ]
})
export class HeaderComponent {
  public anistate = 'inactive';
  myitem = [
    {
      menu : 'Home'
    },
    {
      menu : 'DashBoard'
    },
    {
      menu : 'Courses Taken'
    },
    {
      menu : 'Reports'
    },
    {
      menu : 'Edit Info'
    },
    {
      menu : 'Log Out'
    },
  ];
  constructor() { }

  selectedIndex = 0;
  select(index: number) {
      this.selectedIndex = index;
  }

  toggleState() {
    this.anistate = this.anistate === 'active' ? 'inactive' : 'active';
  }
}
