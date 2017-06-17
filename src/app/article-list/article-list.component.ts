import { Component, OnInit, Input } from '@angular/core';
import {Article} from '.././article'
import { ArticleService } from '.././article.service';
import {ActivatedRoute} from '@angular/router'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers:[
    ArticleService
  ]
})
export class ArticleListComponent implements OnInit {

  articles:Observable<Article[]>
  //articles:Article[]
  constructor(private articleservice:ArticleService, private activatedRoute:ActivatedRoute){
      this.articles = articleservice.orderedArticles
   }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      const sourceKey = params['sourceKey'];
      this.articleservice.getArticlesOber(sourceKey);
    })
     //this.articleservice.getArticlesByApi()
               // .then(articles => this.articles = articles)

  }

}
