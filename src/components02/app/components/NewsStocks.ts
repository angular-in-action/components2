// List people
import {Component, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';
import {ArticlesService} from './../services/ArticlesService';

@Component({
  selector: 'NewsStocks',
  templateUrl: './app/components/newsStocks.html',
  inputs: ['showArticles'],
  providers: [ArticlesService]
})
export class NewsStocks implements OnChanges {

  public articles: Array<any>;

  constructor(public articlesService:ArticlesService) { };

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if ( changes.showArticles && changes.showArticles.currentValue !== '') {
      var currSymbol = changes.showArticles;
      if (currSymbol.previousValue !== currSymbol.currentValue) {
        this.fetchArticles(currSymbol.currentValue);
      }
    }
  }

  //TODO: Bring over the call to the service to get the ListStocks
  private fetchArticles(symbol) {
    this.articlesService.fetch(symbol)
      .subscribe(
      (data) => {
        console.log('articles from ListStocks', data);
        if (data.status === 'ERROR') {
          this.articles = undefined;
        } else {
          this.articles = data.result.docs  
        }
      },
      (err) => {
        console.log('error in articlesService', err);
      }
      )
  }  
  
}