import { Router , ActivatedRoute } from '@angular/router';
import { ServerserviceService } from './../serverservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moduleintro',
  templateUrl: './moduleintro.component.html',
  styleUrls: ['./moduleintro.component.css']
})
export class ModuleintroComponent implements OnInit {

  moduleIntro = [];
  userToken: string;
  selectedCourseId: any;

  constructor(public serverservice: ServerserviceService, public router: Router , public route: ActivatedRoute) {

   }

  ngOnInit() {
    this.userToken = localStorage.getItem('userToken');
    this.selectedCourseId = this.route.snapshot.params['id'];
    this.serverservice.getallModuleDetails(this.userToken, this.selectedCourseId).subscribe((response: any) => {
      console.log(response);
      this.serverservice.allmodulesarray = response[this.serverservice.currentModule];
      this.moduleIntro = this.serverservice.allmodulesarray.intro;
    });
  }

  navigatToNxt() {
    this.router.navigate(['/quiz', { id: this.selectedCourseId }]);
  }

}
