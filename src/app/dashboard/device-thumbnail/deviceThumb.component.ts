/**
 * Created by skylele on 3.3.17.
 */
import {Component, Input} from '@angular/core';
import {DevicesService} from '../devices/devices.service'
import {Device} from "../devices/devices.metadata";
@Component({
    moduleId: module.id,
    selector: 'device-thumb',
    templateUrl :  'deviceThumb.component.html' ,
    providers: [DevicesService],
     styleUrls: ['../../../assets/css/device.css']
})

export class DeviceThumbComponent {

    @Input() device: Device;
}
