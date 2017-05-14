/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NewDeviceService } from "./newDevice.service"
import { Location } from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";
import {DevicesService} from "../devices/devices.service";
import {Device, DeviceCapability} from "../devices/devices.metadata";
import {NewCapabilityService} from "../capability-add/newCapabilityService";
import {CapabilitiesService} from "../Capabilities/capabilities.service";
import {Capability} from "../Capabilities/capabilities.metadata";

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
    providers: [NewDeviceService, DevicesService, CapabilitiesService],
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
    public capabilities: Capability[];
    constructor(private _httpService: NewDeviceService,
                private _fb: FormBuilder,
                private location: Location,
                private route: ActivatedRoute,
                private deviceThumbService: DevicesService,
                private newDeviceService: NewDeviceService,
                private capabilitiesService: CapabilitiesService) {

    }

    ngOnInit() {
      //device / capabilities, sets variables if both are ready
      var entitiesReady: Boolean[] = [false, false];

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
            .subscribe(dev => {
                this.device = dev;
                entitiesReady[0] = true;
                if(entitiesReady.every(item => item == true))
                  this.setVariables()
              },
                () => console.log("finished")
            );

      this.capabilitiesService.getCapabilities()
        .subscribe(caps => {
          this.capabilities = caps;
          entitiesReady[1] = true;
          if(entitiesReady.every(item => item == true))
            this.setVariables()
        });
    }

    setVariables() {

        this.addDeviceForm.patchValue({address: this.device.adress,
            device_vendor: this.device.device_vendor,
            device_version: this.device.device_version,
            kernel_version:this.device.kernel_version,
            os_distribution: this.device.os_distribution,
            system_info: this.device.system_info,

    });


      this.route.params
        .switchMap((params: Params) => this.deviceThumbService.getDeviceCapabilities(+params['id']))
        // .subscribe(device => this.doMagic(device),
        .subscribe(devs => {this.setCapabilities(devs)},
          () => console.log("finished"));
    }

    setCapabilities(capabilities: DeviceCapability[]) {



      capabilities.forEach((item, index) => {
        var capability: Capability = this.capabilities.filter(cap => cap.id == item.cap_id)[0];
        //TODO Change item.id to item.name after name is added to backend!
        this.addDeviceCapability(String(item.cap_id) + " — " + capability.name, String(item.id), item.bus_connection);
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



  addDevice(device:any) {
    // call API to save capabiity
    var splitValue = device.value.device_capabilities.device_capability.split(" — ");
    device.value.device_capabilities.device_capability = splitValue[0];



    //console.log(JSON.stringify(capability._value));
    this.newDeviceService.postDevice(device.value).subscribe(
      data => console.log(data),
      error => alert(error),
      () => console.log("post request is completed")
    );
  }

  editDevice(device: any, id: number | string)  {

    var splitValue = device.value.device_capabilities.device_capability.split(" — ");
    device.value.device_capabilities.device_capability = splitValue[0];


    this.newDeviceService.putDevice(device.value, id).subscribe(
      data => console.log(data),
      error => alert(error),
      () => console.log("post request is completed")
    );
  }


    goBack(): void {
        this.location.back();
    }


}
