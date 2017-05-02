/**
 * Created by skylele on 5.3.17.
 */
import {Component, ViewChild, ViewEncapsulation, OnInit ,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';


import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { DeviceThumbService } from '../device-thumbnail/deviceThumb.service';

import {Application} from "../Applications/applications.metadata";

import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import {Device} from "../device-thumbnail/deviceThumb.metadata";
import {FormControl} from "@angular/forms";
import {ApplicationService} from "../Applications/applications.service";

export enum profileSubPages {
    logging = 1,
    loadedApplications
}
@Component({
    moduleId: module.id,
    selector: 'device-profile',
    templateUrl: 'deviceProfile.component.html',
    providers: [DeviceThumbService, ApplicationService],
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
  @ViewChild('modal')
  modal: ModalComponent;
  items: string[] = ['item1', 'item2', 'item3'];
  selected: string;

  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;


  deleteDevice() {
    console.log("device deleted");
    this.modal.close();
  }
  open() {
    this.modal.open();
  }
    device: Device;
    subPage: profileSubPages = profileSubPages.logging;
    apps = [];
    searchInput = new FormControl();


    constructor(
        private deviceThumbService: DeviceThumbService,
        private applicationService: ApplicationService,
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

            this.applicationService.getApplication(appId)
                .subscribe((app) => {this.apps[index] = app},
                    () => console.log("finished"));
        });

        console.log(this.apps);

    }



    goBack(): void {
        this.location.back();
    }
}
