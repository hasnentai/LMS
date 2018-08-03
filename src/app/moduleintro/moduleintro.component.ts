import { Router , ActivatedRoute } from '@angular/router';
import { ServerserviceService } from './../serverservice.service';
import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-moduleintro',
  templateUrl: './moduleintro.component.html',
  styleUrls: ['./moduleintro.component.css']
})
export class ModuleintroComponent implements OnInit {

  url: string;
  currentModule: any;
  moduleIntro = [];
  userToken: string;
  selectedCourseId: any;
  data;
  videopresent = true;
  userStat = {
    module: -1,
    quiz: -1
  };
  constructor(public serverservice: ServerserviceService, public router: Router , public route: ActivatedRoute,
     private userState: UserStateService) {

   }

  ngOnInit() {
    this.selectedCourseId = localStorage.getItem('courseId');
    this.url = window.location.href;
    this.currentModule = this.url.substring(this.url.indexOf('=') + 1, this.url.length);
    this.userToken = localStorage.getItem('userToken');
    this.data = this.userState.getAllData();
    this.initializeData(this.data);
    this.userState.test();

    console.log(this.currentModule);
    // this.serverservice.getallModuleDetails(this.userToken, this.selectedCourseId).subscribe((response: any) => {
    //   console.log(response);
    // });
  }
  initializeData(response) {
    this.serverservice.allmodulesarray = response[this.currentModule];
    this.moduleIntro = this.serverservice.allmodulesarray.intro;
  }
  navigatToNxt() {
    this.router.navigateByUrl('/quiz?ct=' + this.currentModule);
  }

}
