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
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 3.3.17.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var rxjs_1 = require("rxjs");
var ApplicationService = (function () {
    function ApplicationService(http) {
        this.http = http;
        this.applicationsUrl = 'http://127.0.0.1:8080/application/'; // URL to web api
        this.applicationsList = this.http.get(this.applicationsUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return rxjs_1.Observable.throw(error.json().error || 'Server error'); })
            .publishReplay(1)
            .refCount();
    }
    ApplicationService.prototype.getList = function () {
        return this.applicationsList;
    };
    ApplicationService.prototype.getApplications = function (text) {
        var lowerCaseText = text.toLowerCase();
        return this.getList()
            .map(function (applications) { return applications.filter(function (item) { return item.name.toLowerCase().indexOf(lowerCaseText) !== -1; }); });
    };
    ApplicationService.prototype.getApplication = function (applicationsId) {
        var url = "" + this.applicationsUrl + applicationsId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    ApplicationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApplicationService);
    return ApplicationService;
}());
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=applications.service.js.map