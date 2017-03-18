/**
 * Created by skylele on 5.3.17.
 */
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
var test_service_1 = require("./test.service");
var testComponent = (function () {
    function testComponent(_httpService) {
        this._httpService = _httpService;
    }
    testComponent.prototype.onTestGet = function () {
        var _this = this;
        console.log("get request starting");
        this._httpService.getCurrentTime()
            .subscribe(function (data) { return _this.getData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("get request is completed"); });
        console.log("get request is completed");
    };
    testComponent.prototype.onTestPost = function () {
        var _this = this;
        console.log("post request starting");
        this._httpService.postJSON()
            .subscribe(function (data) { return _this.postData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("post request is completed"); });
    };
    testComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'test',
            templateUrl: 'test.component.html',
            styleUrls: ['../../../assets/css/app.css'],
            providers: [test_service_1.testService],
        }), 
        __metadata('design:paramtypes', [test_service_1.testService])
    ], testComponent);
    return testComponent;
}());
exports.testComponent = testComponent;
//# sourceMappingURL=test.component.js.map