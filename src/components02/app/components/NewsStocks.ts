// List people
import {Component, EventEmitter, Input, OnChanges, SimpleChange} from 'angular2/core';
import {ArticlesService} from './../services/ArticlesService';

@Component({
  selector: 'NewsStocks',
  templateUrl: './app/components/newsStocks.html',
  providers: [ArticlesService]
})
export class NewsStocks implements OnChanges {

  public @Input() showArticlesFor: string = '';
  public articles: Array<any>;

  constructor(public articlesService:ArticlesService) { };

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if ( changes.showArticlesFor && changes.showArticlesFor.currentValue !== '') {
      var currSymbol = changes.showArticlesFor;
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