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

//todo <row> do html, aby to fungovalo i pri zmenseni + podivat se jestli tam neni takova chyyba s sidebarem

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
    ipPattern = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$";

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
            id: ['', [Validators.required]],
            kernel_version: [''],
            os_distribution: ['', [Validators.required]],
            system_info: [''],
            installed_capabilities: this._fb.array([
                this.initInstalledCapability(),

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

      device.installed_capabilities.forEach((item, index) => {
        this.addInstalledCapability(item);
        if(index == 0)
          this.removeInstalledCapability(index);
      });

    }


    initInstalledCapability(capability: string = "") {
        // initialize our order
        return this._fb.group({
            installed_capability: [capability, Validators.required]
        });
    }
    addInstalledCapability(capability: string = "") {
        // add order to the list
        const control = <FormArray>this.addDeviceForm.controls['installed_capabilities'];
        control.push(this.initInstalledCapability(capability));
    }

    removeInstalledCapability(i: number) {
        // remove address from the list
        const control = <FormArray>this.addDeviceForm.controls['installed_capabilities'];
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
