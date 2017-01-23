import { Component } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'my-app',
  templateUrl: '../html/app.component.html',
  styleUrls: ['../css/app.component.css']
})
export class AppComponent  {
  name = 'Angular';
  today = new Date();
  ngOnInit(){
    let timer = Observable.timer(1000,1000);
    timer.subscribe(t=>this.today = new Date());
  }


}
