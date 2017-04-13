/**
 * Created by skylele on 10.4.17.
 */
/**
 * Created by skylele on 3.3.17.
 */
import { Injectable } from '@angular/core';
import { Http,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

import { Device } from "../device-thumbnail/deviceThumb.metadata";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Application} from "../Applications/applications.metadata";
import {ActivatedRoute, Params} from "@angular/router";

@Injectable()
export class DeviceProfileService {

    private applicationsUrl = 'http://localhost:8080/application/';
    constructor(private http: Http) { }



getApplication(applicationsId: string) {
        console.log(applicationsId);

        const url = `${this.applicationsUrl}${applicationsId}`;
        return this.http.get(url)
            .map((response:Response) => response.json());

}

}