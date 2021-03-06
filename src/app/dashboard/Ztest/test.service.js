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
/**
 * Created by skytzi on 6.2.17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var testService = (function () {
    function testService(_http) {
        this._http = _http;
        this._url = "http://127.0.0.1:8080/device/1";
    }
    testService.prototype.getCurrentTime = function () {
        console.log("getting the time from " + this._url);
        return this._http.get(this._url)
            .map(function (response) { return response.json(); });
    };
    testService.prototype.postJSON = function () {
        var json = JSON.stringify({ var1: 'test', var2: 5 });
        var params = 'json=' + json;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post('http://validate.jsontest.com', params, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    testService.prototype.postDevice = function (data) {
        var json = JSON.stringify(data);
        var params = 'json=' + json;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post('http://validate.jsontest.com', params, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    return testService;
}());
testService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], testService);
exports.testService = testService;
//# sourceMappingURL=test.service.js.map