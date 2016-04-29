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

  public stocksList: Array<string>;
  public @Output() showArticles: EventEmitter = new EventEmitter();

  public stocksList: Array<Object> = [];
  public prevStocksLength: number = -1;

  defaultStocks = [
    { symbol: 'CRM', own: 101 },
    { symbol: 'AAPL', own: 301 }
  ]

  constructor(public StocksService:StocksService, public articlesService:ArticlesService) {
  };

  ngOnInit() {
    this.defaultStocks.forEach( (item) => {
      this.StocksService.addStock(item);
    })
    this.fetchStocks();
  }

  // TODO: sloppy way of determining if a change has happened so we know if we need
  //  to run the fetch again. Look into how/why this.stocksList gets updated
  //  when something changes. 
  // Use this as a demo of lifecycle, make an alternative version where a message
  //  is emitted from AddStock which then changes a value here (perhaps as an input value
  //  so I can use onChange to detect the change). 
  ngDoCheck() {
    console.log("changes", this.stocksList.length, this.prevStocksLength);
    if (this.stocksList.length !== this.prevStocksLength) {
      console.log("stocksList changed!")
      this.fetchStocks();
    }
    this.prevStocksLength = this.stocksList.length;
  }

  fetchStocks() {
    this.StocksService.snapshot()
    .subscribe(
      (data) => {
        this.stocksData = data;
        this.stocksList = this.StocksService.getStocks();
      },
      (err) => { console.log('error!', err) }
    );
  }
}