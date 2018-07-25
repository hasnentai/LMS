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

  constructor(public el: ElementRef, public renderer: Renderer2) { }
  imagepresent = true;
  imagediv: any;
  optionsdiv: any;

  ngOnInit() {
      this.imagediv = this.el.nativeElement.getElementsByClassName('imagecontainer')[0];
      this.optionsdiv = this.el.nativeElement.getElementsByClassName('listclass')[0];
      console.log(this.imagediv);
    if (!this.imagepresent) {
      this.renderer.addClass(this.imagediv, 'imagedisplaynone');
      this.renderer.removeClass(this.optionsdiv, 'listclass');
      this.renderer.addClass(this.optionsdiv, 'optionsnoimage');
    }
  }
}
