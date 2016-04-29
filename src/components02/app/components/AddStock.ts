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

  // TODO this is currently working to get the additional data
  // 
  addStock() {
    this.stocksService.addStock({symbol:this.symbol, own:this.own})
    .subscribe(
      (data) => {
        console.log("after the add", data)
      },
      (err) => {
        console.log("error after adding");
      })
  }
}