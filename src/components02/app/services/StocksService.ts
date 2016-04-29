//a simple service
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';

@Injectable()
export class StocksService {

  private _stocksList: Array = [];

  // TS shortcut "public" to put http on this
  constructor(public http: Http) {}
  
  getStocks() {
    return this._stocksList;
  }

  addStock(stock) {
    // debugger
    this._stocksList.push(stock);
    return this.snapshot();
  }

  removeStock(symbol:string) {
    var i;
    if( (i = this._stocksList.indexOf(symbol)) > -1 ) {
      this._stocksList.splice(i,1)  
    }
  }
  
  snapshot():any {
    var stocksSymbols = this.getStocks().map((stock) => {
      return stock.symbol;
    })

    let params = new URLSearchParams();
    params.set('symbols', stocksSymbols);

    return this.http.get("/api/snapshot", {search: params})
      .map(res => res.json()) // convert to JSON
      .map(x => x.filter(y => y.name)); // Remove invalid stocks (no name)
  }


}