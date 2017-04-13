/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NewDeviceService } from "./newDevice.service"
import { Location } from '@angular/common';

//TODO:export const addDeviceFields - interface : string:string --- prvni pro ng promennou, druha pro vypis GUI


@Component({
    moduleId: module.id,
    selector: 'device-add',
    templateUrl: 'newDevice.component.html',
    styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
    providers: [NewDeviceService],
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

    constructor(private _httpService: NewDeviceService,
                private _fb: FormBuilder,
                private location: Location) {

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
        this.location.back();
    }


}
