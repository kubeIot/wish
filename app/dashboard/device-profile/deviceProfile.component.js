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
 * Created by skylele on 5.3.17.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var deviceThumb_service_1 = require('../device-thumbnail/deviceThumb.service');
require('rxjs/add/operator/switchMap');
var DeviceProfileComponent = (function () {
    function DeviceProfileComponent(deviceThumbService, route, location) {
        this.deviceThumbService = deviceThumbService;
        this.route = route;
        this.location = location;
    }
    DeviceProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.deviceThumbService.getDevice(+params['id']); })
            .subscribe(function (device) { return _this.device = device; }, function () { return console.log("finished" + _this.device); });
    };
    DeviceProfileComponent.prototype.goBack = function () {
        this.location.back();
    };
    DeviceProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'device-profile',
            templateUrl: 'deviceProfile.component.html',
            providers: [deviceThumb_service_1.DeviceThumbService],
            styleUrls: ['../../../assets/css/device.css', '../../../assets/css/app.css'],
            animations: [
                core_1.trigger('profile', [
                    core_1.state('*', core_1.style({
                        opacity: 1 })),
                    core_1.transition('void => *', [
                        core_1.style({ opacity: 0,
                        }),
                        core_1.animate('1s 0s ease-out')
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [deviceThumb_service_1.DeviceThumbService, router_1.ActivatedRoute, common_1.Location])
    ], DeviceProfileComponent);
    return DeviceProfileComponent;
}());
exports.DeviceProfileComponent = DeviceProfileComponent;
//# sourceMappingURL=deviceProfile.component.js.map