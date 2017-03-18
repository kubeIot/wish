/**
 * Created by skytzi on 9.2.17.
 */
import { NgModule }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes }   from '@angular/router';
// all components
import { DashboardComponent } from './dashboard.component';
import { DeviceComponent } from './device/device.component';
import { eventsLogComponent } from './eventsLog.component';

// device profile
import { DeviceProfileComponent } from './device/deviceProfile.component';
// device folder
// import { DeviceThumbComponent } from './device/deviceThumb.component';
// device add
import { DeviceAddComponent } from './device/deviceAdd.component';
// about
import {AboutComponent} from "./about.component";
// profil
import {ProfileComponent} from "./profile.component";
/*FIXME: http://valor-software.com/ng2-charts/ */

 import {apijsontestComponent} from "./ApiCallTest.component"



const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'events-log', component: eventsLogComponent },
    { path: 'device-add', component: DeviceAddComponent },
    { path: 'device-profile/:id', component: DeviceProfileComponent },
    { path: 'about', component: AboutComponent },
     { path: 'test', component: apijsontestComponent }, //test
    { path: '**', redirectTo: '/dashboard' }
];


@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})


export class AppRoutingModule { }