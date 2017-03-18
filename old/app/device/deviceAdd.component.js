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
 * Created by skytzi on 15.12.16.
 */
var core_1 = require('@angular/core');
var DeviceAddComponent = (function () {
    function DeviceAddComponent() {
    }
    DeviceAddComponent = __decorate([
        core_1.Component({
            selector: 'device-add',
            templateUrl: '../../html/device/deviceAdd.component.html',
            styleUrls: ['css/app.component.css', 'css/device.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DeviceAddComponent);
    return DeviceAddComponent;
}());
exports.DeviceAddComponent = DeviceAddComponent;
//# sourceMappingURL=deviceAdd.component.js.map