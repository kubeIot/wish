/**
 * Created by skytzi on 5.5.17.
 */

import {Component, trigger, transition, style, animate, group, state, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {PagerService} from "../../helper-services/pager.service";
import {ApplicationService} from "../Applications/applications.service";
import {Image} from "../Applications/applications.metadata";
import {CapabilitiesService} from "../Capabilities/capabilities.service";
import {Capability} from "../Capabilities/capabilities.metadata";

@Component({
  moduleId: module.id,
  selector: 'images',
  providers: [ApplicationService, PagerService, CapabilitiesService],
  templateUrl: 'images.component.html',
  styleUrls: ['../../../assets/css/app.css'],
  animations: [
    trigger('images', [
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

export class ImagesComponent  implements OnInit{
  searchNameInput = new FormControl();
  images: Observable<Image[]>;
  capabilities: Capability[];
  sortItem = "name";
  revert = false;
  //pager variables
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  //end of pager variables

  //modal variables
  @ViewChild('modal')
  modal: ModalComponent;
  selected: string;

  index: number = 0;
  nameInModal: string;
  idInModal: number | string;
  //modal variables

  constructor (
               private pagerService: PagerService,
               private applicationService: ApplicationService,
               private capabilitiesService: CapabilitiesService) {

  }
  deleteCapability() {
    console.log("Image deleted");
    this.modal.close();
  }

  deleteConfirm(name:string = "this image", id:number | string) {
    this.nameInModal = name;
    this.idInModal = id;
    this.modal.open()
  }


  ngOnInit(): void {
    this.images = this.searchNameInput.valueChanges
      .startWith('')
      .debounce(() => Observable.interval(200))
      .distinctUntilChanged()
      .flatMap(term => this.applicationService.getFilteredImages(term));

    this.capabilitiesService.getCapabilities([])
      .subscribe(capabilities => this.capabilities = capabilities);

    this.images.subscribe(result => {this.pagedItems = result;
      this.setPage(1);});
  }

  changeSort(sort: string): void {
    if(this.sortItem == sort)
      this.revert = !this.revert;
    else
      this.sortItem = sort;
  }

  getRequiredCapabilitiesName(Ids: number[]) {
    let capabilitiesNames: string[] = [];

    let filteredCapabilities: Capability[] = this.capabilities.filter(
      capability => Ids.some(id => id==capability.id));

    filteredCapabilities.forEach((capability) =>  {
      capabilitiesNames = capabilitiesNames.concat(capability.name)
    });

    return capabilitiesNames;
  }

  setPage(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }
    //
    // // get pager object from service
    // this.pager = this.pagerService.getPager(this.pagedItems.length, page, 20);
    //
    // // get current page of items
    // this.pagedItems = this.pagedItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }



}
