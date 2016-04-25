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

    console.log("ngonChanges first", changes.showArticles)
    if ( changes.showArticles && changes.showArticles.currentValue !== '') {
      var currSymbol = changes.showArticles;

      console.log("handling showArticles", currSymbol.currentValue);
      if (currSymbol.previousValue !== currSymbol.currentValue) {
        this.fetchArticles(currSymbol.currentValue);
      }
    }
  }

  //TODO: Bring over the call to the service to get the ListStocks
  public fetchArticles(symbol) {
    this.articlesService.fetch(symbol)
      .subscribe(
      (data) => {
        console.log('articles from ListStocks', data);
        this.articles = data.result.docs
        // result.docs.0.source.enriched.url.title  or .url
      },
      (err) => {
        console.log('error in articlesService', err);
      }
      )
  }  
  
}