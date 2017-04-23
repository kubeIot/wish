/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NewDeviceService } from "./newDevice.service"
import { Location } from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
import {DeviceThumbService} from "../device-thumbnail/deviceThumb.service";
import {Device} from "../device-thumbnail/deviceThumb.metadata";

//TODO:export const addDeviceFields - interface : string:string --- prvni pro ng promennou, druha pro vypis GUI


@Component({
    moduleId: module.id,
    selector: 'device-add',
    templateUrl: 'newDevice.component.html',
    styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
    providers: [NewDeviceService, DeviceThumbService],
    animations: [
        trigger('newdevice', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out')
            ])
        ])
    ]
})

export class NewDeviceComponent implements OnInit {

    public addDeviceForm: FormGroup;
    public device: Device;
    constructor(private _httpService: NewDeviceService,
                private _fb: FormBuilder,
                private location: Location,
                private route: ActivatedRoute,
                private deviceThumbService: DeviceThumbService) {

    }

    ngOnInit() {
        // we will initialize our form here
        this.addDeviceForm = this._fb.group({
            address: ['', [Validators.required]],
            device_vendor: ['', [Validators.required]],
            device_version: ['', [Validators.required]],
            id: ['', [Validators.required]],
            kernel_version: ['', [Validators.required]],
            number_of_applications: ['', [Validators.required]],
            os_distribution: ['', [Validators.required]],
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
            .switchMap((params: Params) => this.deviceThumbService.getDevice(+params['id']))
            // .subscribe(device => this.doMagic(device),
            .subscribe(dev => this.setVariables(dev),
                () => console.log("finished"));
    }

    setVariables(device: Device) {
        this.device = device;
        this.addDeviceForm.patchValue({address: device.adress,
            device_vendor: device.device_vendor,
            device_version: device.device_version,
            kernel_version:device.kernel_version,
            number_of_applications: device.number_of_applications,
            os_distribution: device.os_distribution,
            system_info: device.system_info,

    });
    }

    initApplication() {
        // initialize our order
        return this._fb.group({
            application: ['', Validators.required]
        });
    }
    addApplication() {
        // add order to the list
        const control = <FormArray>this.addDeviceForm.controls['applications'];
        control.push(this.initApplication());
    }

    removeApplication(i: number) {
        // remove address from the list
        const control = <FormArray>this.addDeviceForm.controls['applications'];
        control.removeAt(i);
    }

    initInstalledCapability() {
        // initialize our order
        return this._fb.group({
            installed_capability: ['', Validators.required]
        });
    }
    addInstalledCapability() {
        // add order to the list
        const control = <FormArray>this.addDeviceForm.controls['installed_capabilities'];
        control.push(this.initInstalledCapability());
    }

    removeInstalledCapability(i: number) {
        // remove address from the list
        const control = <FormArray>this.addDeviceForm.controls['installed_capabilities'];
        control.removeAt(i);
    }

    initUsedCapability() {
        // initialize our order
        return this._fb.group({
            application_id: [''],
            capability_id: ['']
        });
    }
    addUsedCapability() {
        // add order to the list
        const control = <FormArray>this.addDeviceForm.controls['used_capabilities'];
        control.push(this.initUsedCapability());
    }

    removeUsedCapability(i: number) {
        // remove address from the list
        const control = <FormArray>this.addDeviceForm.controls['used_capabilities'];
        control.removeAt(i);
    }


    addDevice(model:any) {
        // call API to save customer

        console.log(JSON.stringify(model._value));
    }

    goBack(): void {
        //this.location.back();
        console.log("text");
        for (var i in this.addDeviceForm.controls) {
            this.addDeviceForm.controls[i].markAsTouched();
        }
    }


}
