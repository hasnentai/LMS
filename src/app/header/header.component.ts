import { Component, OnInit , ElementRef, Renderer2 } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { HostListener } from '@angular/core';
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
  content: any;
  selectedIndex = 0;

  constructor(public el: ElementRef, public renderer: Renderer2) {}

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
    {
      menu : 'Log Out',
      link : '/you'
    },
  ];


  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (window.pageYOffset >= 100) {
      this.content = this.el.nativeElement.getElementsByTagName('nav')[0];
      this.renderer.addClass(this.content, 'after-scroll-header');
      console.log(this.content);
    }  else {
      this.renderer.removeClass(this.content, 'after-scroll-header');
    }
  }


  select(index: number) {
      this.selectedIndex = index;
  }

  toggleState() {
    this.anistate = this.anistate === 'active' ? 'inactive' : 'active';
  }
}
