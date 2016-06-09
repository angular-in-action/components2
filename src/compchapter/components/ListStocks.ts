// List people
import {Component, EventEmitter, OnInit, DoCheck, SimpleChange, Input, Output} from 'angular2/core';
import {StocksService} from '../services/StocksService';

@Component({
  selector: 'ListStocks',
  templateUrl: './components/listStocks.html'
})
export class ListStocks implements OnInit, DoCheck {

  public @Output() showArticlesEvt: EventEmitter = new EventEmitter();

  public stocksData: Array<Object> = [];
  public prevStocksLength: number = -1;

  constructor(public stocksService:StocksService) {
  };

  ngOnInit() {
    // Initialize so DoCheck doesn't re-request the same data
    this.prevStocksLength = this.stocksService.getStocks().length;
    this.getStocks();
  }

  // Use this as a demo of lifecycle, make an alternative version where a message
  //  is emitted from AddStock which then changes a value here (perhaps as an input value
  //  so I can use onChange to detect the change). 
  // If the stock list length changes, we need to re-fetch
  ngDoCheck() {
    if (this.stocksService.getStocks().length !== this.prevStocksLength) {
      this.getStocks();
      this.prevStocksLength = this.stocksService.getStocks().length;
    }
  }

  getStocks() {
    this.stocksService.snapshot()
    .subscribe(
      (data) => {
        // this.stocksData = data;
        this.stocksData.length = 0;
        this.stocksData.splice(0, undefined, ...data);
      },
      (err) => { this.stocksData.length = 0; console.log('error!', err) }
    );
  }

  removeStock(symbol:string) {
    this.stocksService.removeStock(symbol);
  }
}