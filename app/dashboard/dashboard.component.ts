import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent{
    loggedIn: any;

    constructor(private router: Router) {
        this.loggedIn = localStorage.getItem('isLoggedIn')

    }

}
