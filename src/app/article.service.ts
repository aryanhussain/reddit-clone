import { Injectable } from '@angular/core';
import { Article } from './article'
import { Http, URLSearchParams } from '@angular/http'

import { environment } from '../environments/environment'
import { Observable, BehaviorSubject } from 'rxjs'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
const  baseUrl = 'https://newsapi.org/';
const  newsApi = 'e4141f9f113a4ff88e8f3836f6e4a0a6';
interface ArticleSortFn{
  (a:Article,b:Article):number;
}

interface ArticleSortOrderFn{
  (direction:number):ArticleSortFn;
}

const sortByTime:ArticleSortOrderFn = (direction:number) => (a:Article, b:Article) =>{
  return direction * (b.publishAt.getTime() - a.publishAt.getTime())  ;
}

const sortByVotes:ArticleSortOrderFn = (direction:number) => (a:Article, b:Article) =>{
  return direction * (b.votes - a.votes)  ;
}

const sortFns={
  'Time':sortByTime,
  'Votes':sortByVotes
}

@Injectable()
export class ArticleService {
  articleArray: Article[]
  private _articles: BehaviorSubject<Article[]> =  new BehaviorSubject<Article[]>([])
  private _sources :BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _sortByDirectionSubject:BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private _sortByfilterSubject:BehaviorSubject<ArticleSortOrderFn> = new BehaviorSubject<ArticleSortOrderFn>(sortByTime);
  private _searchFilterSubject:BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _refreshSubject:BehaviorSubject<string> = new BehaviorSubject<string>('reddit-r-all');
  public articles: Observable<Article[]> = this._articles.asObservable()
  public sources: Observable<any> = this._sources.asObservable()

  public orderedArticles:Observable<Article[]>;

  constructor(
    private http: Http
  ) {
    this.articleArray = [
      new Article('Title1', 'Description1', ''),
      new Article('Title2', 'Description2', ''),
      new Article('Title3', 'Description3', '')
    ]

    this._refreshSubject.subscribe(this.getArticlesOber.bind(this))

    this.orderedArticles = Observable.combineLatest(
      this._articles,
      
      this._sortByfilterSubject,
      this._sortByDirectionSubject,
      this._searchFilterSubject
    ).map(([
      articles,sorter,direction, filtered
    ]) => {
      const re = new RegExp(filtered,'gi')
      return articles
      .filter(a=> re.exec(a.title))
      .sort(sorter(direction));
    })
  }

  public sortBy(
    filter:string,
    direction:number
  ):void{
    this._sortByDirectionSubject.next(direction)
    this._sortByfilterSubject.next(sortFns[filter]) 
  }

  public filterBy(value:string){
    this._searchFilterSubject.next(value);
  }

  // simple way getting data
  public getArticles(): Promise<Article[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.articleArray)
      }, 2000);
    });
  }

  // By API getting data
  public getArticlesByApi(): Promise<Article[]> {
    let params = new URLSearchParams()
    params.set('apikey', newsApi)
    params.set('source', 'reddit-r-all')
    return this.http.get(`${baseUrl}/v1/articles`, {
      search: params
    }).toPromise()
      .then(resp => resp.json())
      .then(json => json.articles)
      .then(articles => {
        const list = articles
          .map(article =>
            Article.fromJson(article))
        console.log(list)
        return list;
      })
      .catch(err => {
        console.log(err);
      })
  }

  // By Oberservable getting data
  public getArticlesOber(sourceKey:string): void {
    // make http request
    // convert json to Article class
    // update subject
    this._makeHttpRequest('/v1/articles', sourceKey)
      .map(json => json.articles)
      .subscribe(acticlesJson => {
        const articles = acticlesJson.map(acticlesJson => Article.fromJson(acticlesJson));
        this._articles.next(articles)
      })

  }

  public updateArticles(sourceKey):void{
    this._refreshSubject.next(sourceKey)
  }

  private _makeHttpRequest(
      path: string,
      sourceKey?: string
    ): Observable<any> {
      let params = new URLSearchParams()
      params.set('apikey', newsApi)
      params.set('source', sourceKey)
      return this.http.get(`${baseUrl}${path}`, {
        search: params
      }).map(resp => resp.json())
  }

  public getSoucesObs():void{
    this._makeHttpRequest('/v1/sources')
    .map(json => json.sources)
    .filter(list => list.length >0)
    .subscribe(this._sources)
  }

 
}
