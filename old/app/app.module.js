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
var app_routing_module_1 = require('./app-routing.module');
var http_1 = require("@angular/http");
var angular_in_memory_web_api_1 = require('angular-in-memory-web-api');
var inMemoryDataService_service_1 = require('./inMemoryDataService.service');
// all components
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard.component');
var device_component_1 = require('./device/device.component');
var eventsLog_component_1 = require('./eventsLog.component');
// device profile
var deviceProfile_component_1 = require('./device/deviceProfile.component');
// device folder
var deviceThumb_component_1 = require('./device/deviceThumb.component');
// device add
var deviceAdd_component_1 = require('./device/deviceAdd.component');
// about
var about_component_1 = require("./about.component");
// profil
var profile_component_1 = require("./profile.component");
/*FIXME: http://valor-software.com/ng2-charts/ */
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { BarChartComponent } from './charts.component';
//test
var ApiCallTest_component_1 = require("./ApiCallTest.component");
var deviceThumb_service_1 = require("./device/deviceThumb.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule,
                angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(inMemoryDataService_service_1.InMemoryDataService)
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent,
                device_component_1.DeviceComponent,
                eventsLog_component_1.eventsLogComponent,
                deviceThumb_component_1.DeviceThumbComponent,
                deviceAdd_component_1.DeviceAddComponent,
                deviceProfile_component_1.DeviceProfileComponent,
                ApiCallTest_component_1.apijsontestComponent,
                about_component_1.AboutComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [deviceThumb_service_1.DeviceThumbService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map