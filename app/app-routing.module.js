"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by skytzi on 9.2.17.
 */
var core_1 = require('@angular/core');
// import { BrowserModule } from '@angular/platform-browser';
var router_1 = require('@angular/router');
// all components
var dashboard_component_1 = require('./dashboard.component');
var device_component_1 = require('./device/device.component');
var eventsLog_component_1 = require('./eventsLog.component');
// device profile
var deviceProfile_component_1 = require('./device/deviceProfile.component');
// device folder
// import { DeviceThumbComponent } from './device/deviceThumb.component';
// device add
var deviceAdd_component_1 = require('./device/deviceAdd.component');
// about
var about_component_1 = require("./about.component");
// profil
var profile_component_1 = require("./profile.component");
/*FIXME: http://valor-software.com/ng2-charts/ */
var ApiCallTest_component_1 = require("./ApiCallTest.component");
var appRoutes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'device', component: device_component_1.DeviceComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'events-log', component: eventsLog_component_1.eventsLogComponent },
    { path: 'device-add', component: deviceAdd_component_1.DeviceAddComponent },
    { path: 'device-profile/:id', component: deviceProfile_component_1.DeviceProfileComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'test', component: ApiCallTest_component_1.apijsontestComponent },
    { path: '**', redirectTo: '/dashboard' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(appRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map