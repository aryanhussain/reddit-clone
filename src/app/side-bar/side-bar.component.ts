import { Component, OnInit } from '@angular/core';
import { ArticleService } from '.././article.service'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  private sources :Observable<any>;
  constructor(private articleService:ArticleService) {
    this.sources = articleService.sources;
   }

  ngOnInit() {
    this.articleService.getSoucesObs();
  }

}
