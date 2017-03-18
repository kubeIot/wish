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
var deviceThumb_service_1 = require("./deviceThumb.service");
var DeviceComponent = (function () {
    function DeviceComponent(deviceThumbService) {
        this.deviceThumbService = deviceThumbService;
    }
    DeviceComponent.prototype.getDevices = function () {
        var _this = this;
        this.deviceThumbService
            .getDevices()
            .then(function (devices) { return _this.devices = devices; });
    };
    DeviceComponent.prototype.ngOnInit = function () {
        this.getDevices();
    };
    DeviceComponent = __decorate([
        core_1.Component({
            selector: 'staff',
            templateUrl: '../../html/device.component.html',
            styleUrls: ['../../css/app.component.css', '../../css/device.component.css'],
            providers: [deviceThumb_service_1.DeviceThumbService]
        }), 
        __metadata('design:paramtypes', [deviceThumb_service_1.DeviceThumbService])
    ], DeviceComponent);
    return DeviceComponent;
}());
exports.DeviceComponent = DeviceComponent;
//# sourceMappingURL=device.component.js.map