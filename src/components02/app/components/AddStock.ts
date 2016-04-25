// List people
import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'AddStock',
  templateUrl: './app/components/addStock.html'
})
export class AddStock {

  constructor() { };

  doSearch() {
    console.log("in the search", this  );
  }
}