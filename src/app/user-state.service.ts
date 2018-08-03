import { Injectable } from '@angular/core';
import { ServerserviceService } from './serverservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  userState = {
    module: -1,
    quiz: -1
  };
  constructor(private serverService: ServerserviceService) {
  }
  test() {
    this.storeUserState(JSON.stringify(this.userState));
    console.log(JSON.parse(localStorage.getItem('userState')));
  }
  setAllData(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  getAllData() {
    if (JSON.parse(localStorage.getItem('data')) !== null) {
      return JSON.parse(localStorage.getItem('data'));
    } else {
      const data = this.serverService.getallModuleDetails(localStorage.getItem('token'), this.serverService.selectedCourseId);
      this.setAllData(data);
      return data;
    }
  }
  storeUserState(state) {
    localStorage.setItem('userState', state);
  }
  storeCurrentModule(module) {
    localStorage.setItem('cModule', module);
  }
  getCurrentModule() {
    return Number(localStorage.getItem('cModule'));
  }
}
