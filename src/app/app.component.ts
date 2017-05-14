import {Component, DoCheck, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import * as $ from 'jquery';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: './app.component.html'
})

export class AppComponent implements DoCheck {

public logged: boolean = false;

    loggedIn: any;


    ngDoCheck() {
        this.loggedIn = localStorage.getItem('isLoggedIn');
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
