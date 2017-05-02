import { Component, trigger,transition,style,animate,group,state, OnInit } from '@angular/core';
import { Device } from "../device-thumbnail/deviceThumb.metadata"
import { DeviceThumbService } from "../device-thumbnail/deviceThumb.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {PagerService} from "../../helper-services/pager.service";

import * as _ from 'underscore';
// import {sortPipe} from "../sorting.pipe";
@Component({
    moduleId: module.id,
    selector: 'devices',
    templateUrl: 'devices.component.html',
    providers: [DeviceThumbService, PagerService],
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
    tableView = true;

    //pager variables
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //end of pager variables


    constructor (private deviceThumbService: DeviceThumbService, private pagerService: PagerService) {

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

    findClass(status: string): void {

    }

    ngOnInit(): void {
        this.devices = this.searchNameInput.valueChanges
            .startWith('')
            .debounce(() => Observable.interval(200))
            .distinctUntilChanged()
            .flatMap(term => this.deviceThumbService.getDevices(term));
      this.devices.subscribe(result => {this.pagedItems = result;
        this.setPage(1);});
    }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.pagedItems.length, page, 20);

    // get current page of items
    this.pagedItems = this.pagedItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }




}
