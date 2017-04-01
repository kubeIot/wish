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
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var rxjs_1 = require("rxjs");
var DeviceThumbService = (function () {
    function DeviceThumbService(http) {
        this.http = http;
        this.devicesUrl = 'http://127.0.0.1:8080/device'; // URL to web api
        this.devicesList = this.http.get(this.devicesUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return rxjs_1.Observable.throw(error.json().error || 'Server error'); })
            .publishReplay(1)
            .refCount();
    }
    DeviceThumbService.prototype.getList = function () {
        return this.devicesList;
    };
    DeviceThumbService.prototype.getDevices = function (text) {
        // console.log("devices - search: ", text);
        var lowerCaseText = text.toLowerCase();
        return this.getList()
            .map(function (devices) { return devices.filter(function (item) { return item.device_vendor.toLowerCase().indexOf(lowerCaseText) !== -1; }); });
    };
    DeviceThumbService.prototype.getDevice = function (id) {
        var url = this.devicesUrl + "/" + id;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    DeviceThumbService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeviceThumbService);
    return DeviceThumbService;
}());
exports.DeviceThumbService = DeviceThumbService;
//# sourceMappingURL=deviceThumb.service.js.map