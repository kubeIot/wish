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
 * Created by skylele on 3.3.17.
 */
var core_1 = require('@angular/core');
var deviceThumb_service_1 = require('./deviceThumb.service');
var DeviceThumbComponent = (function () {
    function DeviceThumbComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DeviceThumbComponent.prototype, "device", void 0);
    DeviceThumbComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'device-thumb',
            templateUrl: 'deviceThumb.component.html',
            providers: [deviceThumb_service_1.DeviceThumbService],
            styleUrls: ['../../../assets/css/device.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DeviceThumbComponent);
    return DeviceThumbComponent;
}());
exports.DeviceThumbComponent = DeviceThumbComponent;
//# sourceMappingURL=deviceThumb.component.js.map