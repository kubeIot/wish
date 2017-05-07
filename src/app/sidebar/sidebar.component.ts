import {Component, DoCheck, OnInit} from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar-routes.config';
import {Observable} from 'rxjs/Rx';
import {Location} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, DoCheck {

    name = 'What Is Happening';
    today = new Date();

    public menuItems: any[];
    isCollapsed = true;
    loggedIn: any;


    ngDoCheck() {
        this.loggedIn = localStorage.getItem('isLoggedIn');
          // this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);

    }
    constructor(location:Location) {
        this.loggedIn = localStorage.getItem('isLoggedIn');

    }

    ngOnInit() {
        let timer = Observable.timer(1000,1000);
        timer.subscribe(t=>this.today = new Date());
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }
    public get menuIcon(): string {
        return this.isCollapsed ? '☰' : '✖';
    }
    public getMenuItemClasses(menuItem: any) {
        return {
            'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.RIGHT
        };
    }
}
