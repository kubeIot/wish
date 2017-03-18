import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent{
    today = new Date();
    ngOnInit() {
        let timer = Observable.timer(1000,1000);
        timer.subscribe(t=>this.today = new Date());
    }
}
