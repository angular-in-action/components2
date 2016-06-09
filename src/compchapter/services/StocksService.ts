//a simple service
import {Injectable, OnInit} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StocksService implements OnInit {

  private _stocksList: Array = [];
  public counter: Number = 0;

  // The default stocks would normally be persisted for each user
  defaultStocks = [
    { symbol: 'CRM', own: 101 },
    { symbol: 'AAPL', own: 301 }
  ]

  constructor(public http: Http) {
    this.defaultStocks.forEach((item) => {
      this.addStock(item);
    })
  }
  
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
    // create a list of symbols needed to send to the API
    var stocksSymbols = this.getStocks().map((stock) => {
      return stock.symbol;
    })

    // TODO: Get with Jason to find out how to how to return an array and 
    //   then terminate the Observable so an empty list can show up 
    //   in ListStocks.
    if (! stocksSymbols.length) {
      console.log("about to return empty stream", Observable);
      // return Observable.of([]);
    }

    let params = new URLSearchParams();
    params.set('symbols', stocksSymbols);

    return this.http.get("/api/snapshot", {search: params})
      .map(res => res.json()) // convert to JSON
      .map(x => x.filter(y => y.name)) // Remove invalid stocks (no name)
      .map((x) => { 
        // Add "own" to what has been returned. 
        // not great to loop in a loop, probably should make the
        //  _stocksList available as a stream to keep things consistent
        for (var i = 0; i < x.length; i++ ) {
          for (var j = 0; j < this._stocksList.length; j++ ) {
            if (this._stocksList[j].symbol === x[i].symbol) {
              x[i].own = this._stocksList[j].own;
              break;
            }
          }
        }
        return x;
      })
      // TODO: The following doesn't actually work, just results in an error being thrown
      .catch(() => Observable.of([]))
  }


}