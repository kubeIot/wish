import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit, DoCheck{
    today = new Date();
    loggedIn: any;


    ngOnInit() {
        let timer = Observable.timer(1000,1000);
        timer.subscribe(t=>this.today = new Date());
    }

    ngDoCheck() {
        this.loggedIn = localStorage.getItem('isLoggedIn');

    }
}
