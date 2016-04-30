// List people
import {Component, EventEmitter, OnInit, DoCheck, SimpleChange, Input, Output} from 'angular2/core';
import {StocksService} from './../services/StocksService';
import {ArticlesService} from './../services/ArticlesService';

@Component({
  selector: 'ListStocks',
  templateUrl: './app/components/listStocks.html',
  providers: [ArticlesService]
})
export class ListStocks implements OnInit, DoCheck {

  public @Output() showArticles: EventEmitter = new EventEmitter();

  public stocksList: Array<Object> = [];
  public stocksData: Array<Object> = [];
  public prevStocksLength: number = -1;

  defaultStocks = [
    { symbol: 'CRM', own: 101 },
    { symbol: 'AAPL', own: 301 }
  ]

  constructor(public stocksService:StocksService, public articlesService:ArticlesService) {
  };

  ngOnInit() {
    this.defaultStocks.forEach( (item) => {
      this.stocksService.addStock(item);
    })
    this.fetchStocks();
  }

  // Use this as a demo of lifecycle, make an alternative version where a message
  //  is emitted from AddStock which then changes a value here (perhaps as an input value
  //  so I can use onChange to detect the change). 
  ngDoCheck() {
    if (this.stocksService.getStocks().length !== this.prevStocksLength) {
      this.fetchStocks();
      this.prevStocksLength = this.stocksService.getStocks().length;
    }

  }

  fetchStocks() {
    this.stocksService.snapshot()
    .subscribe(
      (data) => {
        this.stocksData = data;
      },
      (err) => { console.log('error!', err) }
    );
  }

  // TODO: This is removing but then it runs into an error somewhere down the line
  //   on trying to get the new version 
  removeStock(symbol:string) {
    this.stocksService.removeStock(symbol);
  }
}