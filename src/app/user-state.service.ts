import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  userState = {
    module: -1,
    quiz: -1
  };
  constructor() {
  }
  test() {
    this.storeUserState(JSON.stringify(this.userState));
    console.log(JSON.parse(localStorage.getItem('userState')));
  }
  setAllData(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  getAllData() {
    return JSON.parse(localStorage.getItem('data'));
  }
  storeUserState(state) {
    localStorage.setItem('userState', state);
  }
}
