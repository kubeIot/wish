import {Component, DoCheck, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import {Auth} from "./auth/auth.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit, DoCheck {

public logged: boolean = false;

    loggedIn: any;


    ngDoCheck() {
        this.loggedIn = localStorage.getItem('isLoggedIn');
    }
    ngOnInit(){
        $.getScript('../assets/js/light-bootstrap-dashboard.js');
    }
    public isMaps(path){
        if(path == window.location.pathname){
            return true;
        }
        else {
            return false;
        }
    }
}
