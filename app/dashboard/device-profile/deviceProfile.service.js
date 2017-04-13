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
 * Created by skylele on 10.4.17.
 */
/**
 * Created by skylele on 3.3.17.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/map');
var DeviceProfileService = (function () {
    function DeviceProfileService(http) {
        this.http = http;
        this.applicationsUrl = 'http://localhost:8080/application/';
    }
    DeviceProfileService.prototype.getApplication = function (applicationsId) {
        console.log(applicationsId);
        var url = "" + this.applicationsUrl + applicationsId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    DeviceProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeviceProfileService);
    return DeviceProfileService;
}());
exports.DeviceProfileService = DeviceProfileService;
//# sourceMappingURL=deviceProfile.service.js.map