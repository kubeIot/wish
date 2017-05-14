/**
 * Created by skylele on 5.3.17.
 */
import {Component, ViewChild, ViewEncapsulation, OnInit ,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';


import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { DevicesService } from '../devices/devices.service';

import {Application} from "../Applications/applications.metadata";

import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import {Device, DeviceEvent} from "../devices/devices.metadata";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApplicationService} from "../Applications/applications.service";
import {PagerService} from "../../helper-services/pager.service";
import {CapabilitiesService} from "../Capabilities/capabilities.service";
import {Capability} from "../Capabilities/capabilities.metadata";
import {IMyOptions} from "mydatepicker";
import {logging} from "selenium-webdriver";

//Used capabilities comes with two Ids
export interface usedCapability {
  application: Application;  // required field
  capability: Capability;
}


export enum profileSubPages {
    logging = 1,
    loadedApplications
}
@Component({
    moduleId: module.id,
    selector: 'device-profile',
    templateUrl: 'deviceProfile.component.html',
    providers: [DevicesService, ApplicationService, PagerService, CapabilitiesService],
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
  // modal variables
  eventsFilter: FormGroup;
  logSortItem = "event_timestamp";
  logRevert = false;

  @ViewChild('modal')
  modal: ModalComponent;
  selected: string;
  index: number = 0;


  //pager variables
  // array of all items to be paged
  private pagedEvents: any[];
  // pager object
  pager: any = {};
  eventsPager: any = {};
  // paged items
  pagedItems: any[];

  //end of pager variables


    device: Device;
    subPage: profileSubPages = profileSubPages.logging;
    apps = [];
    deviceEvents: DeviceEvent[] = [];
    shownDeviceEvents: DeviceEvent[] = [];
    installedCapabilities: Capability[] = [];
    usedCapabilities: usedCapability[] = [];
    searchInput = new FormControl();



    constructor(
        private deviceThumbService: DevicesService,
        private applicationService: ApplicationService,
        private capabilitiesService: CapabilitiesService,
        private pagerService: PagerService,
        private route: ActivatedRoute,
        private location: Location,
        private _fb: FormBuilder,
    ) {
    }

    changeSubPage(change: profileSubPages): void {
        this.subPage = change;
      this.setApplicationPage(1);
      this.setEventsPage(1);
    }


    ngOnInit(): void {
      this.eventsFilter = this._fb.group({
        time_to: [''],
        time_from: [''],
        event_message: [''],
        event_type: ['']
      });


      this.route.params
            .switchMap((params: Params) => this.deviceThumbService.getDevice(+params['id']))
            // .subscribe(device => this.doMagic(device),
            .subscribe(device => this.setVariables(device));

    }

    getClass(status: any) {
        return true;
    }

    //after device is loaded, other variables are set
    setVariables(device: Device){
        this.device = device;

      this.eventsFilter.valueChanges
        .startWith('')
        .debounce(() => Observable.interval(200))
        .distinctUntilChanged()
        .flatMap(term =>
          this.route.params
            .switchMap((params: Params) => this.deviceThumbService.getDeviceEvents(+params['id'], term))
        )
        .subscribe(events => {this.deviceEvents = events.filter(event => event != null);
          this.setEventsPage(1);

        });

      // this.route.params
      //   .switchMap((params: Params) => this.deviceThumbService.getDeviceEvents(+params['id']))
      //   // .subscribe(device => this.doMagic(device),
      //   .subscribe(events => this.deviceEventsList = events.filter(event => event != null));

        this.device.applications.forEach((appId, index) => {

          this.applicationService.getApplication(appId)
                .subscribe((app) => {this.apps[index] = app;
                },
                    () => console.log("finished"));
        });

      this.device.installed_capabilities.forEach((capabilityId, index) => {

        this.capabilitiesService.getCapability(capabilityId)
          .subscribe((capability) => {this.installedCapabilities[index] = capability;
            });
      });

      this.device.used_capabilities.forEach((Ids , index) => {
       //initiazing the used capability
        this.usedCapabilities[index] = {application: null, capability: null};

        this.capabilitiesService.getCapability(Ids.capability_id)
          .subscribe((capability) => { this.usedCapabilities[index].capability = capability;
            });

        this.applicationService.getApplication(Ids.application_id)
          .subscribe((application) => {this.usedCapabilities[index].application = application;
        });
      });

        // console.log(this.apps);

    }

  setApplicationPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }


    if (this.apps == []) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.apps.length, page, 20);
    // get current page of items
    this.pagedItems = this.apps.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  setEventsPage(page: number) {
    if (page < 1 || page > this.eventsPager.totalPages) {
      return;
    }

    // get pager object from service
    this.eventsPager = this.pagerService.getPager(this.deviceEvents.length, page, 20);
    // get current page of items
    this.shownDeviceEvents = this.deviceEvents.slice(this.eventsPager.startIndex, this.eventsPager.endIndex + 1);
  }


  deviceStatus(status: string) {
    if(status == null)
      return false;
    return status.toLowerCase( ) == "running";
  }

  systemEvent(event: DeviceEvent) {

      if(event.event_type.toLowerCase() == "system") {
        return true;
      }
      return false;
  }





  deleteDevice(id: string| number) {
    this.deviceThumbService.deleteDevice(id).subscribe(
      data => console.log(data),
      error => alert(error),
    )
    this.modal.close();
  }






  open() {
    this.modal.open();
  }

  getTime( id: string | number) {
      // + 000 - conversion to miliseconds
      var epochTime = Number(this.deviceEvents.filter(item => item.id == id)[0].event_timestamp + "000");
      // console.log(epochTime);
    var time = new Date(epochTime).toLocaleString();
    if(time == 'Invalid Date')
        time = new Date(1).toLocaleString();
      return time;
      // return epochTime;

  }

  changeSort(sort: string): void {
    if(this.logSortItem == sort)
      this.logRevert = !this.logRevert;
    else
      this.logSortItem = sort;

  }


    goBack(): void {
        this.location.back();
    }
}
