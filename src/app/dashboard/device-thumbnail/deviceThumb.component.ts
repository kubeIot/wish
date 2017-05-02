/**
 * Created by skylele on 3.3.17.
 */
import {Component, Input} from '@angular/core';
import {DeviceThumbService} from './deviceThumb.service'
import {Device} from "./deviceThumb.metadata";
@Component({
    moduleId: module.id,
    selector: 'device-thumb',
    templateUrl :  'deviceThumb.component.html' ,
    providers: [DeviceThumbService],
     styleUrls: ['../../../assets/css/device.css']
})

export class DeviceThumbComponent {

    @Input() device: Device;
}
