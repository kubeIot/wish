import { Component, OnInit } from '@angular/core';
import { DeviceThumbService } from "./deviceThumb.service";
import { Device } from "./devices"

@Component({
    selector: 'staff',
    templateUrl: '../../html/device.component.html',
    styleUrls: ['../../css/app.component.css', '../../css/device.component.css'],
    providers: [DeviceThumbService]
})

export class DeviceComponent implements OnInit {


    devices: Device[];

    constructor (private deviceThumbService: DeviceThumbService) {

    }

    getDevices(): void {
        this.deviceThumbService
            .getDevices()
            .then(devices => this.devices = devices);
    }

    ngOnInit(): void {
        this.getDevices();
    }

}
