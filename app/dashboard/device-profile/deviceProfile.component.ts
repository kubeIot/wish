/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit ,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';


import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { DeviceThumbService } from '../device-thumbnail/deviceThumb.service';

import 'rxjs/add/operator/switchMap';

import {Device} from "../device-thumbnail/deviceThumb.metadata";

@Component({
    moduleId: module.id,
    selector: 'device-profile',
    templateUrl: 'deviceProfile.component.html',
    providers: [DeviceThumbService],
    styleUrls: ['../../../assets/css/device.css' , '../../../assets/css/app.css'],
    animations: [
        trigger('profile', [
            state('*', style({
                opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                }),
                animate('1s 0s ease-out')
            ])
        ])
    ]
})

export class DeviceProfileComponent implements OnInit {
    device: Device;

    constructor(
        private deviceThumbService: DeviceThumbService,
        private route: ActivatedRoute,
        private location: Location
    ) {}


    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.deviceThumbService.getDevice(+params['id']))
            .subscribe(device => this.device = device,
                () => console.log("finished" + this.device));
    }

    goBack(): void {
        this.location.back();
    }
}
