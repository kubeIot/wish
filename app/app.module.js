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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
// all components
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard.component');
var device_component_1 = require('./device.component');
var eventsLog_component_1 = require('./eventsLog.component');
// device profile
var deviceProfile_component_1 = require('./device/deviceProfile.component');
// device folder
var deviceThumb_component_1 = require('./device/deviceThumb.component');
// device add
var deviceAdd_component_1 = require('./device/deviceAdd.component');
// about
var about_component_1 = require("./about.component");
/*FIXME: http://valor-software.com/ng2-charts/ */
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { BarChartComponent } from './charts.component';
var appRoutes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'device', component: device_component_1.DeviceComponent },
    { path: 'events-log', component: eventsLog_component_1.eventsLogComponent },
    { path: 'device-add', component: deviceAdd_component_1.DeviceAddComponent },
    { path: 'device-profile', component: deviceProfile_component_1.DeviceProfileComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: '**', redirectTo: '/dashboard' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(appRoutes),
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                device_component_1.DeviceComponent,
                eventsLog_component_1.eventsLogComponent,
                deviceThumb_component_1.DeviceThumbComponent,
                deviceAdd_component_1.DeviceAddComponent,
                deviceProfile_component_1.DeviceProfileComponent,
                about_component_1.AboutComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map