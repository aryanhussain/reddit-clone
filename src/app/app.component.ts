import { Component, ViewEncapsulation } from '@angular/core';
import {Article} from './article'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    
  ],
  encapsulation:ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'app';
    constructor(){
    
    }
}
