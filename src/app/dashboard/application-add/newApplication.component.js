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
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 5.3.17.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var newApplication_service_1 = require("./newApplication.service");
var common_1 = require("@angular/common");
var deviceThumb_service_1 = require("../devices/devices.service");
var router_1 = require("@angular/router");
var applications_service_1 = require("../Applications/applications.service");
//TODO:export const addDeviceFields - interface : string:string --- prvni pro ng promennou, druha pro vypis GUI
var NewApplicationComponent = (function () {
    function NewApplicationComponent(_httpService, _fb, location, deviceThumbService, applicationService, route) {
        this._httpService = _httpService;
        this._fb = _fb;
        this.location = location;
        this.deviceThumbService = deviceThumbService;
        this.applicationService = applicationService;
        this.route = route;
    }
    NewApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listOfDevices = this.deviceThumbService.getDevices("");
        // we will initialize our form here
        this.addApplicationForm = this._fb.group({
            base_image: ['', [forms_1.Validators.required]],
            device_id: ['', [forms_1.Validators.required]],
            name: ['', [forms_1.Validators.required]],
            service_ip: ['', [forms_1.Validators.required]],
            system_info: [''],
            capabilities: this._fb.array([
                this.initCapability(),
            ]),
            ports: this._fb.array([
                this.initPort(),
            ]),
        });
        this.route.params
            .switchMap(function (params) { return _this.applicationService.getApplication(+params['id']); })
            .subscribe(function (application) { return _this.setVariables(application); }, function () { return console.log("finished"); });
        //
        // this.route.params
        //     .switchMap((params: Params) => this.applicationService.getApplication(+params['id']))
        //     // .subscribe(device => this.doMagic(device),
        //     .subscribe(application => this.application = application,
        //         () => console.log("finished"));
    };
    //Any parameter - can be number or string
    NewApplicationComponent.prototype.setVariables = function (application) {
        var _this = this;
        this.application = application;
        this.addApplicationForm.patchValue({ base_image: application.base_image,
            device_id: application.device_id,
            name: application.name,
            service_ip: application.service_ip,
        });
        application.ports.forEach(function (item, index) {
            _this.addPort(item);
            if (index == 0)
                _this.removePort(index);
        });
        application.capabilities.forEach(function (item, index) {
            _this.addCapability(item);
            if (index == 0)
                _this.removeCapability(index);
        });
    };
    //Any because it accepts strings as well as numbers
    NewApplicationComponent.prototype.initCapability = function (value) {
        if (value === void 0) { value = ""; }
        // initialize our order
        return this._fb.group({
            capability: [value, forms_1.Validators.required]
        });
    };
    NewApplicationComponent.prototype.addCapability = function (value) {
        if (value === void 0) { value = ""; }
        // add order to the list
        var control = this.addApplicationForm.controls['capabilities'];
        control.push(this.initCapability(value));
    };
    NewApplicationComponent.prototype.removeCapability = function (i) {
        // remove address from the list
        var control = this.addApplicationForm.controls['capabilities'];
        control.removeAt(i);
    };
    //Any because it accepts strings as well as numbers
    NewApplicationComponent.prototype.initPort = function (value) {
        if (value === void 0) { value = ""; }
        // initialize our order
        return this._fb.group({
            port: [value, forms_1.Validators.required]
        });
    };
    NewApplicationComponent.prototype.addPort = function (value) {
        if (value === void 0) { value = ""; }
        // add order to the list
        var control = this.addApplicationForm.controls['ports'];
        control.push(this.initPort(value));
    };
    NewApplicationComponent.prototype.removePort = function (i) {
        // remove address from the list
        var control = this.addApplicationForm.controls['ports'];
        control.removeAt(i);
    };
    NewApplicationComponent.prototype.addAppPost = function (model) {
        // call API to save customer
        console.log(JSON.stringify(model._value));
    };
    NewApplicationComponent.prototype.goBack = function () {
        this.location.back();
    };
    return NewApplicationComponent;
}());
NewApplicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'application-add',
        templateUrl: 'newApplication.component.html',
        styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
        providers: [newApplication_service_1.NewApplicationService, deviceThumb_service_1.DevicesService, applications_service_1.ApplicationService],
        animations: [
            core_1.trigger('newapplication', [
                core_1.state('*', core_1.style({
                    '-ms-transform': 'translate3D(0px, 0px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                    '-moz-transform': 'translate3D(0px, 0px, 0px)',
                    '-o-transform': 'translate3D(0px, 0px, 0px)',
                    transform: 'translate3D(0px, 0px, 0px)',
                    opacity: 1
                })),
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
    __metadata("design:paramtypes", [newApplication_service_1.NewApplicationService,
        forms_1.FormBuilder,
        common_1.Location,
        deviceThumb_service_1.DevicesService,
        applications_service_1.ApplicationService,
        router_1.ActivatedRoute])
], NewApplicationComponent);
exports.NewApplicationComponent = NewApplicationComponent;
//# sourceMappingURL=newApplication.component.js.map
