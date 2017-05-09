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
      this.menuItems = ROUTES.filter(menuItem =>
        (menuItem.menuType !== MenuType.BRAND) &&
        !(localStorage.getItem("showDevice") === "false" && menuItem.title == 'New Device') &&
        !(localStorage.getItem("showApplication") === "false" && menuItem.title == 'New Application') &&
        !(localStorage.getItem("showImage") === "false" && menuItem.title == 'New Image') &&
        !(localStorage.getItem("showCapability") === "false" && menuItem.title == 'New Capability')

      );
    }
    constructor(location:Location) {
        this.loggedIn = localStorage.getItem('isLoggedIn');

    }

    ngOnInit() {
        let timer = Observable.timer(1000,1000);
        timer.subscribe(t=>this.today = new Date());
        if (localStorage.getItem("showDevice") === null)
          localStorage.setItem("showDevice", "true");

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
