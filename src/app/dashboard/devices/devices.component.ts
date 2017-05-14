import { Component, trigger,transition,style,animate,group,state, OnInit } from '@angular/core';
import { Device } from "./devices.metadata"
import { DevicesService } from "./devices.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {PagerService} from "../../helper-services/pager.service";

import * as _ from 'underscore';
import {UserService} from "../profile/profile.service";
// import {sortPipe} from "../sorting.pipe";
@Component({
    moduleId: module.id,
    selector: 'devices',
    templateUrl: 'devices.component.html',
    providers: [DevicesService, PagerService, UserService],
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
    public searchNameInput: FormGroup;
    devices: Observable<Device[]>;
    sortItem = "device_vendor";
    revert = false;
    tableView = true;
    devs: Device[];
  private loggedInUser: any;


//pager variables
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //end of pager variables


    constructor (private deviceThumbService: DevicesService,
                 private pagerService: PagerService,
                  private userService: UserService,
                 private _fb: FormBuilder,) {

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

      this.searchNameInput = this._fb.group({
        device_vendor: [''],
        address: [''],
        system_info: [''],
      });


      this.userService.getUser(1).subscribe(user => {this.loggedInUser = user;
      console.log(this.loggedInUser);});

        this.devices = this.searchNameInput.valueChanges
            .startWith('')
            .debounce(() => Observable.interval(200))
            .distinctUntilChanged()
            .flatMap(term => this.deviceThumbService.getDevices(term));
      this.devices.subscribe(result => {this.devs = result;

        this.setPage(1);});
    }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    if(this.devs.length <= 0) { //Checks, that there is some device to be displayed, otherwise pager fails
      this.pagedItems = [];
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.devs.length, page, 20);

    // get current page of items
    this.pagedItems = this.devs.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }




}
