import { Component, trigger,transition,style,animate,group,state, OnInit } from '@angular/core';
import { Device } from "../device-thumbnail/deviceThumb.metadata"
import { DeviceThumbService } from "../device-thumbnail/deviceThumb.service";

@Component({
    moduleId: module.id,
    selector: 'devices',
    templateUrl: 'devices.component.html',
    providers: [DeviceThumbService],
    animations: [
        trigger('devices', [
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

export class DevicesComponent implements OnInit {

    devices: Device[];
    devicesData:any;
    constructor (private deviceThumbService: DeviceThumbService) {

    }

    getDevices(): void {
        this.deviceThumbService
            .getDevices()
            .subscribe(
                data => this.devicesData = data,
                error => alert(error),
                () => console.log("get request is completed")
            );
    }


    // onTestGet() {
    //     console.log("get request starting");
    //     this._httpService.getCurrentTime()
    //     // .subscribe(data => this.getData = JSON.stringify(data));
    //         .subscribe(
    //             data => this.getData = data,
    //             error => alert(error),
    //             () => console.log("get request is completed")
    //         );
    //
    //     console.log(this.getData);;
    //     console.log("get request is completed");
    // }

    ngOnInit(): void {
        this.getDevices();
    }

}
