import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = "recipe";

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBN0JYzWuLI3W-GLOJbH6y3vdZm-Zh-yCI",
      authDomain: "ng-recipe-book-40b44.firebaseapp.com",
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature= feature;
  }
}
