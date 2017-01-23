import { Component } from '@angular/core';
import { DeviceThumbService } from "./device/deviceThumb.service";


@Component({
    selector: 'staff',
    templateUrl: '../html/device.component.html',
    styleUrls: ['css/app.component.css', '../css/device.component.css'],
    providers: [DeviceThumbService]
})

export class DeviceComponent {

    devices: {
        img: string,
        room: string,
        building: string,
        people: string
    }[];

    constructor (deviceThumbService: DeviceThumbService) {
        this.devices = deviceThumbService.getItems();
    }

}
