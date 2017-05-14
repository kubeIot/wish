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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by skylele on 5.3.17.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var deviceThumb_service_1 = require("../devices/devices.service");
require("rxjs/add/operator/switchMap");
var forms_1 = require("@angular/forms");
var applications_service_1 = require("../Applications/applications.service");
var profileSubPages;
(function (profileSubPages) {
    profileSubPages[profileSubPages["logging"] = 1] = "logging";
    profileSubPages[profileSubPages["loadedApplications"] = 2] = "loadedApplications";
})(profileSubPages = exports.profileSubPages || (exports.profileSubPages = {}));
var DeviceProfileComponent = (function () {
    function DeviceProfileComponent(deviceThumbService, applicationService, route, location) {
        this.deviceThumbService = deviceThumbService;
        this.applicationService = applicationService;
        this.route = route;
        this.location = location;
        this.subPage = profileSubPages.logging;
        this.apps = [];
        this.searchInput = new forms_1.FormControl();
    }
    DeviceProfileComponent.prototype.changeSubPage = function (change) {
        this.subPage = change;
    };
    DeviceProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("text");
        this.route.params
            .switchMap(function (params) { return _this.deviceThumbService.getDevice(+params['id']); })
            .subscribe(function (device) { return _this.setVariables(device); }, function () { return console.log("finished"); });
    };
    DeviceProfileComponent.prototype.getClass = function (status) {
        return true; // activity-ok ,warning, error according to status TODO
    };
    DeviceProfileComponent.prototype.setVariables = function (device) {
        var _this = this;
        this.device = device;
        this.device.applications.forEach(function (appId, index) {
            _this.applicationService.getApplication(appId)
                .subscribe(function (app) { _this.apps[index] = app; }, function () { return console.log("finished"); });
        });
        console.log(this.apps);
    };
    DeviceProfileComponent.prototype.goBack = function () {
        this.location.back();
    };
    return DeviceProfileComponent;
}());
DeviceProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'device-profile',
        templateUrl: 'deviceProfile.component.html',
        providers: [deviceThumb_service_1.DevicesService, applications_service_1.ApplicationService],
        styleUrls: ['../../../assets/css/device.css', '../../../assets/css/app.css'],
        animations: [
            core_1.trigger('profile', [
                core_1.state('*', core_1.style({
                    opacity: 1
                })),
                core_1.transition('void => *', [
                    core_1.style({ opacity: 0,
                    }),
                    core_1.animate('1s 0s ease-out')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [deviceThumb_service_1.DevicesService,
        applications_service_1.ApplicationService,
        router_1.ActivatedRoute,
        common_1.Location])
], DeviceProfileComponent);
exports.DeviceProfileComponent = DeviceProfileComponent;
//# sourceMappingURL=deviceProfile.component.js.map
