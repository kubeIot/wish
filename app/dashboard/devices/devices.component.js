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
var deviceThumb_service_1 = require("../device-thumbnail/deviceThumb.service");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
// import {sortPipe} from "../sorting.pipe";
var DevicesComponent = (function () {
    function DevicesComponent(deviceThumbService) {
        this.deviceThumbService = deviceThumbService;
        this.searchNameInput = new forms_1.FormControl();
        this.sortItem = "device_vendor";
        this.revert = false;
        this.tableView = false;
    }
    DevicesComponent.prototype.changeLayout = function () {
        this.tableView = !this.tableView;
    };
    DevicesComponent.prototype.changeSort = function (sort) {
        if (this.sortItem == sort)
            this.revert = !this.revert;
        else
            this.sortItem = sort;
    };
    DevicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.devices = this.searchNameInput.valueChanges
            .startWith('')
            .debounce(function () { return rxjs_1.Observable.interval(200); })
            .distinctUntilChanged()
            .flatMap(function (term) { return _this.deviceThumbService.getDevices(term); });
    };
    DevicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'devices',
            templateUrl: 'devices.component.html',
            providers: [deviceThumb_service_1.DeviceThumbService],
            styleUrls: ['../../../assets/css/device.css', '../../../assets/css/app.css'],
            // pipes: [sortPipe],
            animations: [
                core_1.trigger('devices', [
                    core_1.state('*', core_1.style({
                        '-ms-transform': 'translate3D(0px, 0px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                        '-moz-transform': 'translate3D(0px, 0px, 0px)',
                        '-o-transform': 'translate3D(0px, 0px, 0px)',
                        transform: 'translate3D(0px, 0px, 0px)',
                        opacity: 1 })),
                    core_1.transition('void => *', [
                        core_1.style({ opacity: 0,
                            '-ms-transform': 'translate3D(0px, 150px, 0px)',
                            '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                            '-moz-transform': 'translate3D(0px, 150px, 0px)',
                            '-o-transform': 'translate3D(0px, 150px, 0px)',
                            transform: 'translate3D(0px, 150px, 0px)',
                        }),
                        core_1.animate('0.3s 0s ease-out')
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [deviceThumb_service_1.DeviceThumbService])
    ], DevicesComponent);
    return DevicesComponent;
}());
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map