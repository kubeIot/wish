/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NewApplicationService } from "./newApplication.service";
import { Location } from '@angular/common';
import {Device} from "../device-thumbnail/deviceThumb.metadata";
import {Observable} from "rxjs";
import {DeviceThumbService} from "../device-thumbnail/deviceThumb.service";



//TODO:export const addDeviceFields - interface : string:string --- prvni pro ng promennou, druha pro vypis GUI


@Component({
    moduleId: module.id,
    selector: 'application-add',
    templateUrl: 'newApplication.component.html',
    styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
    providers: [NewApplicationService, DeviceThumbService],
    animations: [
        trigger('newapplication', [
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

export class NewApplicationComponent implements OnInit {
    listOfDevices: Observable<Device[]>;

    public addApplicationForm: FormGroup;

    constructor(private _httpService: NewApplicationService,
                private _fb: FormBuilder,
                private location: Location,
                private deviceThumbService: DeviceThumbService) {

    }

    ngOnInit() {

        this.listOfDevices = this.deviceThumbService.getDevices("");

        console.log(this.listOfDevices);
        // we will initialize our form here
        this.addApplicationForm = this._fb.group({
            base_image: ['', [Validators.required]],
            device_id: ['', [Validators.required]],
            name: ['', [Validators.required]],
            service_ip: ['', [Validators.required]],

            system_info: [''],
            capabilities: this._fb.array([
                this.initCapability(),

            ]),
            ports: this._fb.array([
                this.initPort(),

            ]),
        });
    }


    initCapability() {
        // initialize our order
        return this._fb.group({
            capability: ['', Validators.required]
        });
    }
    addCapability() {
        // add order to the list
        const control = <FormArray>this.addApplicationForm.controls['capabilities'];
        control.push(this.initCapability());
    }

    removeCapability(i: number) {
        // remove address from the list
        const control = <FormArray>this.addApplicationForm.controls['capabilities'];
        control.removeAt(i);
    }

    initPort() {
        // initialize our order
        return this._fb.group({
            port: ['', Validators.required]
        });
    }
    addPort() {
        // add order to the list
        const control = <FormArray>this.addApplicationForm.controls['ports'];
        control.push(this.initPort());
    }

    removePort(i: number) {
        // remove address from the list
        const control = <FormArray>this.addApplicationForm.controls['ports'];
        control.removeAt(i);
    }




    addAppPost(model:any) {
        // call API to save customer

        console.log(JSON.stringify(model._value));
    }


    goBack(): void {
        this.location.back();
    }

}
