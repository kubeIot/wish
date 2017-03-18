/**
 * Created by skytzi on 4.2.17.
 */

import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {apicalltestService} from "./ApiCallTest.service";


@Component({
    selector: 'apijsontest',
    templateUrl: 'html/ApiCallTest.component.html',
    styleUrls: ['../css/device.component.css', 'css/app.component.css', 'css/about.component.css'],
    providers: [apicalltestService],
})

export class apijsontestComponent {





    getData: string;
    postData: string;


    constructor(private _httpService: apicalltestService) {

    }

    onTestGet() {
        console.log("get request starting");
        this._httpService.getCurrentTime()
            .subscribe(
              data => this.getData = JSON.stringify(data),
                error => alert(error),
                () => console.log("get request is completed")
            );

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
