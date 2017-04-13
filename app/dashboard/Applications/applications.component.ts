/**
 * Created by skylele on 14.3.17.
 */
import { Component, trigger,transition,style,animate,group,state, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import { Application } from "./applications.metadata";
import {ApplicationService} from "./applications.service";
@Component({
    moduleId: module.id,
    selector: 'applications',
    providers: [ApplicationService],
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
    searchNameInput = new FormControl();
    applications: Observable<Application[]>;
    sortItem = "device_vendor";
    revert = false;
    tableView = true;
    constructor (private applicationService: ApplicationService) {

    }

    ngOnInit(): void {
        this.applications = this.searchNameInput.valueChanges
            .startWith('')
            .debounce(() => Observable.interval(200))
            .distinctUntilChanged()
            .flatMap(term => this.applicationService.getApplications(term));
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


}
