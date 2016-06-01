// List people
import {Component, EventEmitter, OnInit, DoCheck, SimpleChange, Input, Output} from 'angular2/core';
import {StocksService} from './../services/StocksService';

@Component({
  selector: 'ListStocks',
  templateUrl: './app/components/listStocks.html'
})
export class ListStocks implements OnInit, DoCheck {

  public @Output() showArticlesEvt: EventEmitter = new EventEmitter();

  public stocksData: Array<Object> = [];
  public prevStocksLength: number = -1;

  defaultStocks = [
    { symbol: 'CRM', own: 101 },
    { symbol: 'AAPL', own: 301 }
  ]

  constructor(public stocksService:StocksService) {
  };

  ngOnInit() {
    this.defaultStocks.forEach( (item) => {
      this.stocksService.addStock(item);
    })
    // Initialize so DoCheck doesn't re-request the same data
    this.prevStocksLength = this.stocksService.getStocks().length;
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

  // TODO: Rename as it isn't fetching any more, it is subscribing
  fetchStocks() {
    this.stocksService.snapshot()
    .subscribe(
      (data) => {
        // this.stocksData = data;
        this.stocksData.length = 0;
        this.stocksData.splice(0, undefined, ...data);
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