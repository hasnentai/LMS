import { ServerserviceService } from './../serverservice.service';
import { Router , ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ElementRef,
  Renderer,
  Renderer2,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: any;
  userToken: string;
  selectedCourseId: any;

  constructor(public el: ElementRef, public renderer: Renderer2, public serverservice:
    ServerserviceService, public route: ActivatedRoute ) { }
  imagepresent = false;
  imagediv: any;
  optionsdiv: any;

  ngOnInit() {
    this.userToken = localStorage.getItem('userToken');
    this.selectedCourseId = this.route.snapshot.params['id'];
      this.imagediv = this.el.nativeElement.getElementsByClassName('imagecontainer')[0];
      this.optionsdiv = this.el.nativeElement.getElementsByClassName('listclass')[0];
      console.log(this.imagediv);
    if (!this.imagepresent) {
      this.renderer.addClass(this.imagediv, 'imagedisplaynone');
      this.renderer.removeClass(this.optionsdiv, 'listclass');
      this.renderer.addClass(this.optionsdiv, 'optionsnoimage');
    }
    this.serverservice.getallModuleDetails(this.userToken, this.selectedCourseId).subscribe((response: any) => {
      console.log(response);
      this.serverservice.allmodulesarray = response[this.serverservice.currentModule];
      this.quiz = this.serverservice.allmodulesarray.quiz;
      console.log(this.quiz);
    });
  }
}
