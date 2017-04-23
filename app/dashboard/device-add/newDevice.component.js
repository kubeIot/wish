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
 * Created by skylele on 5.3.17.
 */
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var newDevice_service_1 = require("./newDevice.service");
var common_1 = require('@angular/common');
var router_1 = require("@angular/router");
var deviceThumb_service_1 = require("../device-thumbnail/deviceThumb.service");
//TODO:export const addDeviceFields - interface : string:string --- prvni pro ng promennou, druha pro vypis GUI
var NewDeviceComponent = (function () {
    function NewDeviceComponent(_httpService, _fb, location, route, deviceThumbService) {
        this._httpService = _httpService;
        this._fb = _fb;
        this.location = location;
        this.route = route;
        this.deviceThumbService = deviceThumbService;
    }
    NewDeviceComponent.prototype.ngOnInit = function () {
        var _this = this;
        // we will initialize our form here
        this.addDeviceForm = this._fb.group({
            address: ['', [forms_1.Validators.required]],
            device_vendor: ['', [forms_1.Validators.required]],
            device_version: ['', [forms_1.Validators.required]],
            id: ['', [forms_1.Validators.required]],
            kernel_version: ['', [forms_1.Validators.required]],
            number_of_applications: ['', [forms_1.Validators.required]],
            os_distribution: ['', [forms_1.Validators.required]],
            system_info: [''],
            applications: this._fb.array([
                this.initApplication(),
            ]),
            installed_capabilities: this._fb.array([
                this.initInstalledCapability(),
            ]),
            used_capabilities: this._fb.array([
                this.initUsedCapability(),
            ]),
        });
        this.route.params
            .switchMap(function (params) { return _this.deviceThumbService.getDevice(+params['id']); })
            .subscribe(function (dev) { return _this.setVariables(dev); }, function () { return console.log("finished"); });
    };
    NewDeviceComponent.prototype.setVariables = function (device) {
        this.device = device;
        this.addDeviceForm.patchValue({ address: device.adress,
            device_vendor: device.device_vendor,
            device_version: device.device_version,
            kernel_version: device.kernel_version,
            number_of_applications: device.number_of_applications,
            os_distribution: device.os_distribution,
            system_info: device.system_info,
        });
    };
    NewDeviceComponent.prototype.initApplication = function () {
        // initialize our order
        return this._fb.group({
            application: ['', forms_1.Validators.required]
        });
    };
    NewDeviceComponent.prototype.addApplication = function () {
        // add order to the list
        var control = this.addDeviceForm.controls['applications'];
        control.push(this.initApplication());
    };
    NewDeviceComponent.prototype.removeApplication = function (i) {
        // remove address from the list
        var control = this.addDeviceForm.controls['applications'];
        control.removeAt(i);
    };
    NewDeviceComponent.prototype.initInstalledCapability = function () {
        // initialize our order
        return this._fb.group({
            installed_capability: ['', forms_1.Validators.required]
        });
    };
    NewDeviceComponent.prototype.addInstalledCapability = function () {
        // add order to the list
        var control = this.addDeviceForm.controls['installed_capabilities'];
        control.push(this.initInstalledCapability());
    };
    NewDeviceComponent.prototype.removeInstalledCapability = function (i) {
        // remove address from the list
        var control = this.addDeviceForm.controls['installed_capabilities'];
        control.removeAt(i);
    };
    NewDeviceComponent.prototype.initUsedCapability = function () {
        // initialize our order
        return this._fb.group({
            application_id: [''],
            capability_id: ['']
        });
    };
    NewDeviceComponent.prototype.addUsedCapability = function () {
        // add order to the list
        var control = this.addDeviceForm.controls['used_capabilities'];
        control.push(this.initUsedCapability());
    };
    NewDeviceComponent.prototype.removeUsedCapability = function (i) {
        // remove address from the list
        var control = this.addDeviceForm.controls['used_capabilities'];
        control.removeAt(i);
    };
    NewDeviceComponent.prototype.addDevice = function (model) {
        // call API to save customer
        console.log(JSON.stringify(model._value));
    };
    NewDeviceComponent.prototype.goBack = function () {
        //this.location.back();
        console.log("text");
        for (var i in this.addDeviceForm.controls) {
            this.addDeviceForm.controls[i].markAsTouched();
        }
    };
    NewDeviceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'device-add',
            templateUrl: 'newDevice.component.html',
            styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
            providers: [newDevice_service_1.NewDeviceService, deviceThumb_service_1.DeviceThumbService],
            animations: [
                core_1.trigger('newdevice', [
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
        __metadata('design:paramtypes', [newDevice_service_1.NewDeviceService, forms_1.FormBuilder, common_1.Location, router_1.ActivatedRoute, deviceThumb_service_1.DeviceThumbService])
    ], NewDeviceComponent);
    return NewDeviceComponent;
}());
exports.NewDeviceComponent = NewDeviceComponent;
//# sourceMappingURL=newDevice.component.js.map