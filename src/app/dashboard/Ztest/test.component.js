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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var test_service_1 = require("./test.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var testComponent = (function () {
    function testComponent(router, _httpService, _fb) {
        this.router = router;
        this._httpService = _httpService;
        this._fb = _fb;
    }
    testComponent.prototype.ngOnInit = function () {
        // we will initialize our form here
        this.addDeviceForm = this._fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            addresses: this._fb.array([
                this.initAddress(),
            ]),
            orders: this._fb.array([
                this.initOrder(),
            ])
        });
    };
    testComponent.prototype.initOrder = function () {
        // initialize our order
        return this._fb.group({
            order: ['', forms_1.Validators.required]
        });
    };
    testComponent.prototype.addOrder = function () {
        // add order to the list
        var control = this.addDeviceForm.controls['orders'];
        control.push(this.initOrder());
    };
    testComponent.prototype.removeOrder = function (j) {
        // remove address from the list
        var control = this.addDeviceForm.controls['orders'];
        control.removeAt(j);
    };
    testComponent.prototype.initAddress = function () {
        // initialize our address
        return this._fb.group({
            street: ['', forms_1.Validators.required],
            postcode: ['']
        });
    };
    testComponent.prototype.addAddress = function () {
        // add address to the list
        var control = this.addDeviceForm.controls['addresses'];
        control.push(this.initAddress());
    };
    testComponent.prototype.removeAddress = function (i) {
        // remove address from the list
        var control = this.addDeviceForm.controls['addresses'];
        control.removeAt(i);
    };
    testComponent.prototype.save = function (model) {
        // call API to save customer
        console.log(JSON.stringify(model._value));
    };
    testComponent.prototype.onTestGet = function () {
        var _this = this;
        console.log("get request starting");
        this._httpService.getCurrentTime()
            .subscribe(function (data) { return _this.getData = data; }, function (error) { return alert(error); }, function () { return console.log("get request is completed"); });
        console.log(this.getData);
        ;
        console.log("get request is completed");
    };
    testComponent.prototype.onTestPost = function () {
        var _this = this;
        console.log("post request starting");
        this._httpService.postJSON()
            .subscribe(function (data) { return _this.postData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("post request is completed"); });
    };
    return testComponent;
}());
testComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'test',
        templateUrl: 'test.component.html',
        styleUrls: ['../../../assets/css/app.css'],
        providers: [test_service_1.testService],
    }),
    __metadata("design:paramtypes", [router_1.Router, test_service_1.testService, forms_1.FormBuilder])
], testComponent);
exports.testComponent = testComponent;
var Person = (function () {
    function Person() {
    }
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=test.component.js.map