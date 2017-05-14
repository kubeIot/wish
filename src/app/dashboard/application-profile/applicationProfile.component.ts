/**
 * Created by skytzi on 5.5.17.
 */
/**
 * Created by skylele on 5.3.17.
 */
import {Component, ViewChild, ViewEncapsulation, OnInit ,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';


import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';


import {Application} from "../Applications/applications.metadata";

import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import {Device} from "../devices/devices.metadata";
import {FormControl} from "@angular/forms";
import {ApplicationService} from "../Applications/applications.service";
import {PagerService} from "../../helper-services/pager.service";
import {CapabilitiesService} from "../Capabilities/capabilities.service";
import {Capability} from "../Capabilities/capabilities.metadata";
import {DevicesService} from "../devices/devices.service";
import {Image} from "../images/images.metadata";
import {ImagesService} from "../images/images.service";


@Component({
  moduleId: module.id,
  selector: 'application-profile',
  templateUrl: 'applicationProfile.component.html',
  providers: [ApplicationService, PagerService, CapabilitiesService, DevicesService, ImagesService],
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

export class ApplicationProfileComponent implements OnInit {
  // modal variables
  @ViewChild('modal')
  modal: ModalComponent;
  selected: string;
  index: number = 0;

  //pager variables
  // array of all items to be paged
  // pager object
  pager: any = {};
  // paged items
  // pagedItems: any[];

  //end of pager variables


  application: Application;
  device: Device;
  image: Image;
  capabilities: Capability[] = [];


  constructor(
    private applicationService: ApplicationService,
    private capabilitiesService: CapabilitiesService,
    private deviceThumbService: DevicesService,
    private imagesService: ImagesService,
    private pagerService: PagerService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }



  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => this.applicationService.getApplication(+params['id']))
      // .subscribe(device => this.doMagic(device),
      .subscribe(application => this.setVariables(application),
        () => console.log("finished"));


  }

  getClass(status: any) {
    return true; // activity-ok ,warning, error according to status TODO
  }

  setVariables(application: Application){
    this.application = application;


    this.deviceThumbService.getDevice(this.application.device_id)
      .subscribe(device => this.device = device,
        () => console.log("finished"));

    this.imagesService.getImage(this.application.base_image)
      .subscribe(image => this.image = image,
        () => console.log("finished"));


    this.application.capabilities.forEach((capabilityId, index) => {
      this.capabilitiesService.getCapability(capabilityId)
        .subscribe((capability) => {this.capabilities[index] = capability;
        });
    });


  }

  setPage(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }
    //
    // if (this.apps == []) {
    //   return;
    // }
    //
    //
    //
    // // get pager object from service
    // this.pager = this.pagerService.getPager(this.apps.length, page, 20);
    //
    // // get current page of items
    // this.pagedItems = this.apps.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  deleteApplication(id: string| number) {
    this.applicationService.deleteApplication(id).subscribe(
      data => console.log(data),
      error => alert(error),
    )
    this.modal.close();
  }


  applicationStatus(status:string) {
    if(status == null)
      return false;
    return status.toLowerCase( ) == "ok";
  }


  open() {
    this.modal.open();
  }

  goBack(): void {
    this.location.back();
  }
}
