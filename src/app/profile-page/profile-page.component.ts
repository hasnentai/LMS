import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  constructor() { }
  items = [
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
    {
      cardimg : '../../assets/cardimage.jpg',
      title : 'Title Here',
    },
  ];
}