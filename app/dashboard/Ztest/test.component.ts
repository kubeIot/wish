/**
 * Created by skylele on 5.3.17.
 */


import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {testService} from "./test.service";


@Component({
    moduleId: module.id,
    selector: 'test',
    templateUrl: 'test.component.html',
    styleUrls: ['../../../assets/css/app.css'],
    providers: [testService],
})

export class testComponent {





    getData: string;
    postData: string;


    constructor(private _httpService: testService) {

    }

    onTestGet() {
        console.log("get request starting");
        this._httpService.getCurrentTime()
            // .subscribe(data => this.getData = JSON.stringify(data));
                .subscribe(
                data => this.getData = JSON.stringify(data),
                error => alert(error),
                () => console.log("get request is completed")
            );
        console.log("get request is completed");
    }

    onTestPost() {
        console.log("post request starting");
        this._httpService.postJSON()
            .subscribe(
                data => this.postData = JSON.stringify(data),
                error => alert(error),
                () => console.log("post request is completed")
            )
    }
}
