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
//TODO:export const addDeviceFields - interface : string:string --- prvni pro ng promennou, druha pro vypis GUI
var NewDeviceComponent = (function () {
    function NewDeviceComponent(_httpService, _fb) {
        this._httpService = _httpService;
        this._fb = _fb;
    }
    NewDeviceComponent.prototype.ngOnInit = function () {
        // we will initialize our form here
        this.addDeviceForm = this._fb.group({
            address: ['', [forms_1.Validators.required]],
            device_vendor: ['', [forms_1.Validators.required]],
            device_version: ['', [forms_1.Validators.required]],
            id: ['', [forms_1.Validators.required]],
            kernel_version: ['', [forms_1.Validators.required]],
            number_of_applications: ['', [forms_1.Validators.required]],
            os_distribution: ['', [forms_1.Validators.required]],
            system_info: ['']
        });
    };
    NewDeviceComponent.prototype.addDevice = function (model) {
        // call API to save customer
        console.log(JSON.stringify(model._value));
    };
    NewDeviceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'device-add',
            templateUrl: 'newDevice.component.html',
            styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
            providers: [newDevice_service_1.NewDeviceService],
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
        __metadata('design:paramtypes', [newDevice_service_1.NewDeviceService, forms_1.FormBuilder])
    ], NewDeviceComponent);
    return NewDeviceComponent;
}());
exports.NewDeviceComponent = NewDeviceComponent;
//# sourceMappingURL=newDevice.component.js.map