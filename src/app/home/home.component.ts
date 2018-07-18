import { Component, OnInit,ElementRef,Renderer, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public el:ElementRef,public renderer: Renderer2) { }
  card_image;
  card_title;
  card_description;
  cards=[
    {
      card_image:"",
      card_title:"",
      card_description:""
    },
    {
      card_image:"",
      card_title:"",
      card_description:""
    },
    {
      card_image:"",
      card_title:"",
      card_description:""
    },
    {
      card_image:"",
      card_title:"",
      card_description:""
    },
    {
      card_image:"",
      card_title:"",
      card_description:""
    },
    {
      card_image:"",
      card_title:"",
      card_description:""
    }
  ]
  categorywisefilters=[
    {
      catname:"School/PU Students",
      icon:"account_balance"
    },
    {
      catname:"Engineering Students",
      icon:"computer"
    },
    {
      catname:"Management Students",
      icon:"equalizer"
    },
    {
      catname:"Post Graduates",
      icon:"school"
    },
    {
      catname:"Corporate",
      icon:"business"
    }
  ]
  sectionwisefilters=[
    {
      menu:"All"
    },
    {
      menu:"Quiz"
    },
    {
      menu:"Competition"
    },
    {
      menu:"Hackathon"
    }
  ]
  conten:any;
  allbutn:any;
  currentBtn:any;
  clickp(index){
    this.conten = this.el.nativeElement.getElementsByClassName('pills-button')[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName('pills-button');
    console.log(this.allbutn)
    for(let i=0 ; i<this.allbutn.length;i++) {
      if (i != index) {
        //this.renderer.removeClass(this.el.nativeElement.getElementsByClassName('pills-button')[i],'pills-active')
        console.log(this.allbutn[i]);
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn,'pills-active');
        this.renderer.addClass(this.currentBtn,'pills')
      } 
    }
    this.renderer.removeClass(this.conten,'pills');
    this.renderer.addClass(this.conten,'pills-active');
  }
  clickf(index){
    this.conten = this.el.nativeElement.getElementsByClassName('filter-pills-button')[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName('filter-pills-button');
    console.log(this.allbutn)
    for(let i=0 ; i<this.allbutn.length;i++) {
      if (i != index) {
        //this.renderer.removeClass(this.el.nativeElement.getElementsByClassName('pills-button')[i],'pills-active')
        console.log(this.allbutn[i]);
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn,'filter-pills-active');
        this.renderer.addClass(this.currentBtn,'filter-pills')
      } 
    }
    this.renderer.removeClass(this.conten,'filter-pills');
    this.renderer.addClass(this.conten,'filter-pills-active');
  }
  selectedIndex=0;
  select(index:number){
    this.selectedIndex=index;
  }

  ngOnInit() {
  }

}
