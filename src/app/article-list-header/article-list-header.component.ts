import { Component, OnInit } from '@angular/core';
import { ArticleService } from '.././article.service';
declare var jQuery : any

@Component({
  selector: 'app-article-list-header',
  templateUrl: './article-list-header.component.html',
  styleUrls: ['./article-list-header.component.css']
})
export class ArticleListHeaderComponent implements OnInit {
  private currentfilter: string = 'Votes';
  private sortDirection:number = 1;
  constructor(private articleservice:ArticleService) { }
  changeDirection(){
     this.sortDirection = this.sortDirection * -1;
     this._updateSort();
  }

  changeSort(filter:string){
    if(filter === this.currentfilter){
      this.changeDirection();
    }else{
        this.currentfilter = filter;
        this._updateSort();
    }
  }

  _updateSort(){
    this.articleservice.sortBy(this.currentfilter,this.sortDirection)
  }

  liveSearch(evt){
    const val = evt.target.value;
    this.articleservice.filterBy(val);
  }

  ngOnInit() {
    console.log(jQuery('.dropdown'))
    jQuery('.ui.dropdown').dropdown();
  }

}
