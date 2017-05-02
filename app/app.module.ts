import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {LoginModule} from "./login/login/login.module";
// import {InMemoryWebApiModule} from "angular-in-memory-web-api";
// import {InMemoryDataService} from "./dashboard/inMemoryDataService.service";

@NgModule({
    imports:      [
        // Ng2Bs3ModalModule,
        BrowserModule,
        DashboardModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        LoginModule,
        RouterModule.forRoot([]),
        HttpModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [ AppComponent, DashboardComponent ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
