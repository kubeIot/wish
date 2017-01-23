/**
 * Created by skytzi on 14.12.16.
 */
import {Component, Input} from '@angular/core';
import {DeviceThumbService} from './deviceThumb.service'
@Component({
    selector: 'device-thumb',
    templateUrl: '../../html/device/deviceThumb.component.html',
    providers: [DeviceThumbService],
    styleUrls: ['css/app.component.css', 'css/device.component.css']
})

export class DeviceThumbComponent {

    @Input() device: {
        img: string,
        room: string,
        building: string,
        people: string
    };

    item: string[];

    constructor(deviceThumbService: DeviceThumbService) {
        this.item = deviceThumbService.getItem();
    }

}
