import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature= 'recipe';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDLaurPq31ATIERTNO7ott9DD3_HLRuueM",
    authDomain: "ng-recipe-book-4fcf8.firebaseapp.com"
    });
  }
  onNavigate(feature: string){
    this.loadedFeature=feature;
  }
}
