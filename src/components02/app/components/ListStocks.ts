// List people
import {Component, EventEmitter, OnInit, Input, Output} from 'angular2/core';
import {StocksService} from './../services/StocksService';
import {ArticlesService} from './../services/ArticlesService';

@Component({
  selector: 'ListStocks',
  templateUrl: './app/components/listStocks.html',
  providers: [StocksService,ArticlesService]
})
export class ListStocks implements OnInit{

  public @Input() stocksList: Array<string>; 
  public @Output() showArticles: EventEmitter = new EventEmitter();

  constructor(public StocksService:StocksService, public articlesService:ArticlesService) {
  };

  ngOnInit() {
    console.log("ListStocks ngOnInit", this.stocksList.join(','));
    // LEAVE-OFF: Get the service to work to return information and put it into a prop
    //   Then continue with the BP in EverNote AngularBook
    var stocksSymbols = this.stocksList.map( (stock) => {
      return stock.symbol;
    })
    this.StocksService.snapshot(stocksSymbols)
    .subscribe(
      (data) => { this.stocksData = data; console.log("stocksData", this.stocksData) },
    (err) => { console.log('error!', err) }
    );
  }

  // showArticles(stock) {
  //   showArticle.next(stock)
  // }

  // TODO: Move this to the NewsStocks component, activate it by sending a 
  //   message or something to it. 
  // Emit a message here, catch it in the app component. 
  showArticles_orig(stock) {
    this.articlesService.fetch(stock.symbol)
    .subscribe(
      (data) => {
        console.log('articles from ListStocks', data);
      },
      (err) => {
        console.log('error in articlesService', err);
      }
    )
  }

}