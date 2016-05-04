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

  // TODO: Need to get the form to clear after submitting. 
  //  See the Angular 2 docs on forms as it is covered in there. 
  addStock() {
    this.stocksService.addStock({symbol:this.symbol, own:this.own})
  }
}