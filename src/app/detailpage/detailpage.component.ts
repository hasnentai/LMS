import { ServerserviceService } from '../serverservice.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent implements OnInit {
  paymentDone = false ;
  items = [];
  userToken = localStorage.getItem('userToken');
  selectedCourseId;
  selectedCourseName;
  slectedCourseDes;
  selectedCourseImg;
  currentModuleCounter;
  selectedCourseIntro;
  module_Completed = false;
  disabled = false;
  wholePageDetail = {
    title : ''
  };
  modelOpacityContaienr;
  paymentDetails;
  coupon;
  valid = true;
  courseTakenFlag = 0;
  payment = false;
  constructor(public serverservice: ServerserviceService, public el: ElementRef,
    public renderer: Renderer2, public route: ActivatedRoute, public router: Router,
  private userState: UserStateService) { }
  applyCode() {
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken === null) {
      this.router.navigateByUrl('/login');
    } else {
      const id = localStorage.getItem('courseId');
      const courseName = this.wholePageDetail.title;
      //  console.log(this.coupon);
      this.paymentDetails = {
        coupon: this.coupon,
        courseID: id,
        courseName: courseName,
        token: this.userToken
      };
      console.log(this.paymentDetails);
      this.serverservice.sendCoupenCode(this.paymentDetails).subscribe((response: any) => {
        // console.log(response);
        if (response.message === 'Payment Successfull') {
          this.router.navigateByUrl('/moduleintro?ct=0');
          this.valid = true;
        } else {
          this.valid = false;
        }
      });
    }
  }
  checkEnrollment(courseData) {
    console.log(courseData);
    for (const course of courseData) {
      console.log(this.wholePageDetail.title);
      if (course.courseID === localStorage.getItem('courseId')) {
        console.log('Completed ' + course);
        this.courseTakenFlag = 1;
        this.payment = true;
        this.serverservice.checkCompleted(this.userToken, this.wholePageDetail.title).subscribe((response: any) => {
          console.log(response);
          if (response.message === 'not completed') {
            this.paymentDone = true;
          }
          if (response.message === 'completed') {
            this.module_Completed = true;
            this.disabled = true;
          }
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
   this.router.navigateByUrl('/moduleintro?ct=0');
  }

  ngOnInit() {
    this.currentModuleCounter = 0;
    this.selectedCourseId = localStorage.getItem('courseId');
    this.serverservice.getSpecificCourse(this.selectedCourseId).subscribe((response: any) => {
      this.wholePageDetail = response;
      console.log(response);
      this.serverservice.getEditData().subscribe((newresponse: any) => {
        for (const userdata of newresponse) {
          this.checkEnrollment(userdata.enrolments);
        }
      });
    });
    this.serverservice.getcoursecarddetails().subscribe((response: any) => {
      for (const course of response) {
        this.items.push(course);
      }
    });
    this.serverservice.getallModuleDetails(this.userToken, this.selectedCourseId).subscribe((response: any) => {
      this.userState.setAllData(response);
      //  localStorage
    });
  }
}
