/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit ,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';


import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { DeviceThumbService } from '../device-thumbnail/deviceThumb.service';

import {Application} from "../Applications/applications.metadata";

import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs";


import {Device} from "../device-thumbnail/deviceThumb.metadata";
import {DeviceProfileService} from "./deviceProfile.service";
import {FormControl} from "@angular/forms";

export enum profileSubPages {
    logging = 1,
    loadedApplications
}
@Component({
    moduleId: module.id,
    selector: 'device-profile',
    templateUrl: 'deviceProfile.component.html',
    providers: [DeviceThumbService, DeviceProfileService],
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
    subPage: profileSubPages = profileSubPages.logging;
    apps = [];
    searchInput = new FormControl();


    constructor(
        private deviceThumbService: DeviceThumbService,
        private deviceProfileService: DeviceProfileService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    changeSubPage(change: profileSubPages): void {
        this.subPage = change;
    }


    ngOnInit(): void {
        console.log("text")
        this.route.params
            .switchMap((params: Params) => this.deviceThumbService.getDevice(+params['id']))
            // .subscribe(device => this.doMagic(device),
            .subscribe(device => this.setVariables(device),
                () => console.log("finished"));

    }

    getClass(status: any) {
        return true; // activity-ok ,warning, error according to status TODO
    }

    setVariables(device: Device){
        this.device = device;
        this.device.applications.forEach((appId, index) => {

            this.deviceProfileService.getApplication(appId)
                .subscribe((app) => {this.apps[index] = app},
                    () => console.log("finished"));

            // ((data) => {
            //     this.doctors.push(data);
            // })
        });

        console.log(this.apps);

    }
    //
    // getApplications(applicationsIds: string[]): Observable<Application> {
    //     if(applicationsIds == null || applicationsIds == [])
    //         return;
    //
    //     this.apps = this.deviceProfileService.getApplications(applicationsIds);
    //
    //     // this.apps = this.searchInput.valueChanges
    //     //     .startWith('')
    //     //     .debounce(() => Observable.interval(200))
    //     //     .distinctUntilChanged()
    //     //     .flatMap(term => this.deviceProfileService.getApplications(term, applicationsIds));
    //     // return this.apps;
    // }



    goBack(): void {
        this.location.back();
    }
}
