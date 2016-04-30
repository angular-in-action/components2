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
    this._stocksList.push(stock);
  }

  removeStock(symbol:string) {
    var idx = this._stocksList.findIndex((item) => {
      return item.symbol === symbol;
    })
    this._stocksList.splice(idx, 1);
  }
  
  snapshot():any {
    var stocksSymbols = this.getStocks().map((stock) => {
      return stock.symbol;
    })

    let params = new URLSearchParams();
    params.set('symbols', stocksSymbols);

    return this.http.get("/api/snapshot", {search: params})
      .map(res => res.json()) // convert to JSON
      .map(x => x.filter(y => y.name)) // Remove invalid stocks (no name)
      .map((x) => { 
        // Add "own" to what has been returned. This assumes the 
        // _stocksList array contains accurate info that matches to what 
        // is returned by the API
        for (var i = 0; i < x.length; i++ ) {
          x[i].own = this._stocksList[i].own; 
        }
        return x;
      })
  }


}