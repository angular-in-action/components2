// List people
import {Component, EventEmitter} from 'angular2/core';
import {StocksService} from './../services/StocksService';

@Component({
  selector: 'AddStock',
  templateUrl: './app/components/addStock.html'
})
export class AddStock {

  public stockList: Array<Object>;

  constructor(public stocksService:StocksService) { };

  addStock() {
    this.stocksService.addStock({symbol:this.symbol, own:this.own})
  }
}