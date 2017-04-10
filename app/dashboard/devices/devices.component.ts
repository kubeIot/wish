import { Component, trigger,transition,style,animate,group,state, OnInit } from '@angular/core';
import { Device } from "../device-thumbnail/deviceThumb.metadata"
import { DeviceThumbService } from "../device-thumbnail/deviceThumb.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
// import {sortPipe} from "../sorting.pipe";
@Component({
    moduleId: module.id,
    selector: 'devices',
    templateUrl: 'devices.component.html',
    providers: [DeviceThumbService],
    styleUrls: ['../../../assets/css/device.css' , '../../../assets/css/app.css'],
    // pipes: [sortPipe],
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
    searchNameInput = new FormControl();
    devices: Observable<Device[]>;
    sortItem = "device_vendor";
    revert = false;
    tableView = false;
    constructor (private deviceThumbService: DeviceThumbService) {

    }

    changeLayout(): void {
        this.tableView = !this.tableView;
    }
    changeSort(sort: string): void {
        if(this.sortItem == sort)
            this.revert = !this.revert;
        else
            this.sortItem = sort;
    }

    ngOnInit(): void {
        this.devices = this.searchNameInput.valueChanges
            .startWith('')
            .debounce(() => Observable.interval(200))
            .distinctUntilChanged()
            .flatMap(term => this.deviceThumbService.getDevices(term));
    }


}
