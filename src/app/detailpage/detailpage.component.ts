import { ServerserviceService } from '../serverservice.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent implements OnInit {
  items = [];
  userToken = localStorage.getItem('userToken');
  selectedCourseId;
  selectedCourseName;
  slectedCourseDes;
  selectedCourseImg;
  selectedCourseIntro;
  wholePageDetail = {
    title: '',
  };
  modelOpacityContaienr;
  paymentDetails;
  coupon;
  valid = true;
  courseTakenFlag = 0;
  payment = false;
  constructor(public serverservice: ServerserviceService, public el: ElementRef,
    public renderer: Renderer2, public route: ActivatedRoute, public router: Router) { }
  applyCode() {
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken === null) {
      this.router.navigateByUrl('/login');
    } else {
      const id = this.wholePageDetail.title;
      //  console.log(this.coupon);
      this.paymentDetails = {
        coupon: this.coupon,
        course: id,
        token: this.userToken
      };
      console.log(this.paymentDetails);
      this.serverservice.sendCoupenCode(this.paymentDetails).subscribe((response: any) => {
        // console.log(response);
        if (response.message === 'Payment Successfull') {
          this.router.navigateByUrl('/moduleintro');
          this.valid = true;
        } else {
          this.valid = false;
        }
      });
    }
  }
  checkEnrollment(courseData) {
    for (const course of courseData) {
      if (course === this.wholePageDetail.title) {
        // console.log('Completed' + course);
        this.courseTakenFlag = 1;
        this.payment = true;
        this.serverservice.checkCompleted(this.userToken, this.wholePageDetail.title).subscribe((response: any) => {
          console.log(response);
        });
      }
    }
    if (this.courseTakenFlag !== 1) {
      console.log('Not Enrolled');
      this.payment = false;
    }
  }

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

  navigatToNxt() {
    this.router.navigate(['/moduleintro', { id: this.selectedCourseId }]);
  }

  ngOnInit() {
    this.selectedCourseId = this.route.snapshot.params['id'];
    this.serverservice.getSpecificCourse(this.selectedCourseId).subscribe((response: any) => {
      this.wholePageDetail = response;
    });
    this.serverservice.getEditData().subscribe((response: any) => {
      for (const userdata of response) {
        this.checkEnrollment(userdata.enrolments);
      }
    });
    this.serverservice.getcoursecarddetails().subscribe((response: any) => {
      for (const course of response) {
        this.items.push(course);
      }
    });
  }
}
