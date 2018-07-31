import { ServerserviceService } from '../serverservice.service';


import {
  Component,
  OnInit,
  ElementRef,
  Renderer,
  Renderer2,
  HostListener
} from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {
  constructor(public el: ElementRef, public renderer: Renderer2, private serverservice: ServerserviceService, public router: Router) { }
      card_image;
      card_title;
      flag = 0;
      scrollflag = 0;
      card_description;
      cards = [];
      categorywisefilters = [
        {
          catname: 'No Filter',
          icon: 'filter_none'
        },
        {
          catname: 'School/PU Students',
          icon: 'account_balance'
        },
        {
          catname: 'Engineering Students',
          icon: 'computer'
        },
        {
          catname: 'Management Students',
          icon: 'equalizer'
        },
        {
          catname: 'Post Graduates',
          icon: 'school'
        },
        {
          catname: 'Corporate',
          icon: 'business'
        }
      ];
      sectionwisefilters = [
        {
          menu: 'All',
          move: '#targetAllBottom'
        },
        {
          menu: 'Quiz',
          move: '#targetQuizBottom'
        },
        {
          menu: 'Competition',
          move: '#targetCompetitionBottom'
        },
        {
          menu: 'Hackathon',
          move: '#targetHackathonBottom'
        }
      ];
      filterwindow: any;
      userToken = localStorage.getItem('userToken');
      scrollTraget: String;
  content: any;
  conten: any;
  allbutn: any;
  currentBtn: any;
  scrollcontent: any;



  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const max = document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight;
    const pageoffsetsize = max - 1200;
    console.log(windowHeight);
    if (window.pageYOffset <= 300) {
      this.scrollcontent = this.el.nativeElement.getElementsByClassName('scroll-button-div')[0];
      this.renderer.addClass(this.scrollcontent, 'no-scroll-button');
    } else {
      this.renderer.removeClass(this.scrollcontent, 'no-scroll-button');
    }
    if (window.pageYOffset >= 400 &&  window.pageYOffset <= pageoffsetsize) {
      this.flag = 1;
      this.content = this.el.nativeElement.getElementsByClassName('filter-section')[0];
      this.renderer.addClass(this.content, 'fixed-side-filter');
     } else if (this.flag) {
      this.flag = 0;
      this.renderer.removeClass(this.content, 'fixed-side-filter');
        }
  }
  clickp(index) {
    this.conten = this.el.nativeElement.getElementsByClassName('pills-button')[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName('pills-button');
    console.log(this.allbutn);
    for (let i = 0 ; i < this.allbutn.length; i++) {
      if (i !== index) {
        // this.renderer.removeClass(this.el.nativeElement.getElementsByClassName('pills-button')[i],'pills-active')
        console.log(this.allbutn[i]);
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn, 'pills-active');
        this.renderer.addClass(this.currentBtn, 'pills');
      }
    }
    this.renderer.removeClass(this.conten, 'pills');
    this.renderer.addClass(this.conten, 'pills-active');
  }
  clickf(index) {
    this.conten = this.el.nativeElement.getElementsByClassName(
      'filter-pills-button'
    )[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName(
      'filter-pills-button'
    );
    console.log(this.allbutn);
    for (let i = 0; i < this.allbutn.length; i++) {
      if (i !== index) {
        // this.renderer.removeClass(this.el.nativeElement.getElementsByClassName('pills-button')[i],'pills-active')
        console.log(this.allbutn[i]);
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        this.renderer.addClass(this.currentBtn, 'filter-pills');
      }
    }
    this.renderer.removeClass(this.conten, 'filter-pills');
    this.renderer.addClass(this.conten, 'filter-pills-active');
  }
  // tslint:disable-next-line:member-ordering
  selectedIndex = 0;
  select(index: number) {
    this.selectedIndex = index;
  }
  openfilter() {
    this.filterwindow = this.el.nativeElement.getElementsByClassName('filter-section-mobile')[0];
    this.renderer.removeClass(this.filterwindow, 'filter-section-mobile-close');
    this.renderer.addClass(this.filterwindow, 'filter-section-mobile-ani');
  }
  closefilter() {
    this.filterwindow = this.el.nativeElement.getElementsByClassName('filter-section-mobile')[0];
    this.renderer.addClass(this.filterwindow, 'filter-section-mobile-close');
    this.renderer.removeClass(this.filterwindow, 'filter-section-mobile-ani');
  }
  clickm(index) {
    this.conten = this.el.nativeElement.getElementsByClassName('filter-pills-button-mobile')[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName('filter-pills-button-mobile');
    console.log(this.allbutn);
    for (let i = 0 ; i < this.allbutn.length; i++) {
      if (i !== index) {
        console.log(this.allbutn[i]);
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        this.renderer.addClass(this.currentBtn, 'filter-pills');
      }
    }
    this.renderer.removeClass(this.conten, 'filter-pills');
    this.renderer.addClass(this.conten, 'filter-pills-active');
  }
  ngOnInit() {
    this.scrollcontent = this.el.nativeElement.getElementsByClassName('scroll-button-div')[0];

    this.renderer.addClass(this.scrollcontent, 'no-scroll-button');
    this.serverservice.getcoursecarddetails().subscribe((response: any) => {
      for (const course of response) {
        this.cards.push(course);
      }
      console.log(window.pageYOffset + 'kuch bhi');
      console.log(this.cards[0].courseName);
      console.log('cards' + this.cards);
    }) ;
  }
  selectedCourse(intro) {
     this.router.navigate(['/detailpage', { id: intro, }]);
    console.log(intro);
  }
}
