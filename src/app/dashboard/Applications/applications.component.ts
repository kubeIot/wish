/**
 * Created by skylele on 14.3.17.
 */
import {Component, trigger, transition, style, animate, group, state, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Application, Image} from "./applications.metadata";
import {ApplicationService} from "./applications.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {PagerService} from "../../helper-services/pager.service";
@Component({
    moduleId: module.id,
    selector: 'applications',
    providers: [ApplicationService, PagerService],
    templateUrl: 'applications.component.html',
    styleUrls: ['../../../assets/css/app.css'],
    animations: [
        trigger('applications', [
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

export class ApplicationsComponent  implements OnInit{
    searchNameInput: FormGroup;
    applications: Observable<Application[]>;
    images: Image[];
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

  //modal variables
  @ViewChild('modal')
  modal: ModalComponent;
  selected: string;
  index: number = 0;

  nameInModal: string;
  idInModal: number | string;
  //modal variables

  constructor (private applicationService: ApplicationService,
               private _fb: FormBuilder,
               private pagerService: PagerService) {

  }
  deleteApplication() {
    console.log("application deleted");
    this.modal.close();
  }

  deleteConfirm(name:string = "this application", id:number | string) {
    this.nameInModal = name;
    this.idInModal = id;
    this.modal.open()
  }


    ngOnInit(): void {

      this.searchNameInput = this._fb.group({
        name: [''],
        base_image: [''],
        status_message: [''],
      });

      this.applicationService.getImages().subscribe(images => this.images = images);


      this.applications = this.searchNameInput.valueChanges
            .startWith('')
            .debounce(() => Observable.interval(200))
            .distinctUntilChanged()
            .flatMap(term => this.applicationService.getApplications(term));

      this.applications.subscribe(result => {this.pagedItems = result;
        this.setPage(1);});
    }

  getBaseImage(imageId: string | number) {
    return this.images.filter(
      image => image.id == imageId
    )[0].name;
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
