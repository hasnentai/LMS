import { ServerserviceService } from '../serverservice.service';
import { Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent implements OnInit {
  items = [];
  selectedCourseId;
  selectedCourseName;
  slectedCourseDes;
  selectedCourseImg;
  selectedCourseIntro;
  wholePageDetail;
  modelOpacityContaienr;

  constructor(public serverservice: ServerserviceService, public el: ElementRef,
    public renderer: Renderer2, public route: ActivatedRoute) { }

  openModel() {
    console.log('open');
    this.modelOpacityContaienr = this.el.nativeElement.getElementsByClassName('overlay-con')[0];
    console.log(this.modelOpacityContaienr);
    this.renderer.removeClass(this.modelOpacityContaienr, 'overlay-wrapper-close');
    this.renderer.addClass(this.modelOpacityContaienr, 'overlay-wrapper-open');
  }
  closeModel() {
    this.modelOpacityContaienr = this.el.nativeElement.getElementsByClassName('overlay-con')[0];
    this.renderer.addClass(this.modelOpacityContaienr, 'overlay-wrapper-close');
    this.renderer.removeClass(this.modelOpacityContaienr, 'overlay-wrapper-open');
  }

  ngOnInit() {
    this.selectedCourseId = this.route.snapshot.params['id'];
    console.log(this.selectedCourseId);
    // this.selectedCourseId = this.serverservice.selectedCourseId;
        this.serverservice.getcoursecarddetails().subscribe((response: any) => {
      for (const course of response) {
        this.items.push(course);
      }
    });

    this.serverservice.getSpecificCourse(this.selectedCourseId).subscribe((response: any) => {
      this.wholePageDetail = response;
      console.log(this.wholePageDetail);
    });
  }
}
