import {Component} from 'angular2/core';

// TODO: Set this up as the default with the view and style inline and the options commented out. 
@Component({
  selector: 'StockNav',
  template: `
  <div class="row">
    <div class="col-md-12">
      <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
             <span class="sr-only">Toggle navigation</span>
             <span class="glyphicon glyphicon-minus"></span>
          </button>
          <a class="navbar-brand" href="#">Brand (inline)</a>
        </div>
      </nav>
    </div>
  </div>`,
  // templateUrl: './components/stockNav.html',
  styles: ['div {background: yellow;}', '.navbar-brand {font-size: 30px;}'],
  // styleUrls: ['./components/stockNav.css']
})
export class StockNav {}