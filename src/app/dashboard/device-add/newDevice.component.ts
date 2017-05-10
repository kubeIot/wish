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
import {Device, DeviceCapability} from "../device-thumbnail/deviceThumb.metadata";

// only for Post purposes, not full interface!
export interface deviceCapabilityPost {
  device_capability: string;
  capability_name: string;
  bus_connection: string;
}


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
    ipPattern = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$";

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
            device_version: [''],
            name: ['', [Validators.required]],
            kernel_version: [''],
            os_distribution: ['', [Validators.required]],
            system_info: [''],
            device_capabilities: this._fb.array([
                this.initDeviceCapability(),

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
            os_distribution: device.os_distribution,
            system_info: device.system_info,

    });


      this.route.params
        .switchMap((params: Params) => this.deviceThumbService.getDeviceCapabilities(+params['id']))
        // .subscribe(device => this.doMagic(device),
        .subscribe(devs => {this.setCapabilities(devs)},
          () => console.log("finished"));
    }

    setCapabilities(capabilities: DeviceCapability[]) {
      capabilities.forEach((item, index) => {
        this.addDeviceCapability(String(item.cap_id), String(item.id), item.bus_connection);
        if(index == 0)
          this.removeDeviceCapability(index);
      });
    }


    initDeviceCapability(capability: string = "", name: string = "", bus: string = "") {
        // initialize our order


        return this._fb.group({
            device_capability: [capability , Validators.required],
            capability_name: [name, Validators.required],
            bus_connection: [bus, Validators.required],
        });
    }
    addDeviceCapability(capability: string = "", name: string = "", bus: string = "") {
        // add order to the list
        const control = <FormArray>this.addDeviceForm.controls['device_capabilities'];
        control.push(this.initDeviceCapability(capability, name, bus));
    }

    removeDeviceCapability(i: number) {
        // remove address from the list
        const control = <FormArray>this.addDeviceForm.controls['device_capabilities'];
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
