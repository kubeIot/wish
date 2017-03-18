/**
 * Created by skytzi on 23.1.17.
 */
import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { DeviceThumbService } from './deviceThumb.service';

import 'rxjs/add/operator/switchMap';

import {Device} from "./devices";


@Component({
    selector: 'device-profile',
    templateUrl: '../../html/device/deviceProfile.component.html',
    styleUrls: ['css/app.component.css', 'css/device.component.css']
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