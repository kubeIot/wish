import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar-routes.config';
import { MenuType } from '../../sidebar/sidebar-routes.config';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['../../../assets/css/navbar.css']
})

export class NavbarComponent implements OnInit, DoCheck{
    private listTitles: any[];
    location: Location;
    loggedIn: any;

    constructor(location:Location) {
        this.location = location;
        this.loggedIn = localStorage.getItem('isLoggedIn');


    }

    ngDoCheck() {
        this.loggedIn = localStorage.getItem('isLoggedIn');

    }
    ngOnInit(){
        // this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
         this.listTitles = ROUTES;
    }
    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 2 );
        }
        for(var item = 0; item < this.listTitles.length; item++){
            if((this.listTitles[item].path).substring(0, this.listTitles[item].path.length - 3) === titlee.substring(0, titlee.length - 3)){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    setRegister() {
      localStorage.setItem('register', 'true');
    }

    setLogin() {
      localStorage.removeItem('register');
    }
    logout() {
        this.loggedIn = false;
        localStorage.removeItem("isLoggedIn");
        // location.reload();
    }
}
